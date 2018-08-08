<!--id: 2-->
<!--title: Writing a Go interpreter in Go -->
<!--author: Brian Jones-->
<!--postedAt: August 7th-->
<!--updatedAt: August 7th, 2018-->
<!--visible: true-->

## Why Interpreters

The main reason to use an interpreter is an improved workflow. Python has one, iPython is awesome. The draw of LISP's are the interpreters and the rapid feedback loop that evaluating code on the fly gives you. Hell, even Java has a REPL now; even if I haven't used it yet. Python and Lisp are for the sake of this discussion interpreted languages. At the core of each respective design, is the interpreter. In general, the compilation process of languages like Java (JVM Bytecode) or Go (Binary) doesn't lend itself naturally to evaluating expressions on the fly. Historically, to get a quick feedback while developing in a compiled language goes like this:

1.  Write Tests
2.  Run Tests, and observe behavior
3.  Make changes to code

This is a good workflow, but we can do better. This is why interpreters are awesome. Interpreters abstract away the boring parts about testing our code and give us a rapid feed back loop as we work. In EMACs and LISP land, that's just a couple key strokes away.

So... with software anything is possible? Just because Go is compiled doesn't mean we can't conjure up an interpreter for a compiled language, developers _are wizards_ aren't we?

## Humble Beginnings

So with the project in mind, I started writing some code.

I have a very loose understanding of what an interpreter is. So as a resultI also have a very loose idea of what the interpreter is. At it's most simple form, I broke down each piece of the interpreter into this:

- **Accept some raw text and with the input:**
  - Classify the text into functions, expressions, etc.
  - store references to the text
  - store some history of the text
- **Generate code and compile it**
  - Use the history from previous commands to generate the necessary code
  - Generate the code, Compile the code, execute the code.
  - If there is a result, report back to the user
- **The interpreter should accept multiple forms of communication**
  - Client Server relationship
  - REPL/CLI (enter some text in, press enter, view results)
  - Communication is decoupled from the core implementation

## An initial REPL

Turns out, building a usable CLI interface to an interpreter is not easy. my initial strategy was something along these lines

```go
const mainTmpl = `package main
func main() {
    {{.}}
    {{ .M }}
}
 {{ .F }}`

func main() {
    t := template.Must(template.New("mainTmpl").Parse(mainTmpl))
    t.Execute(os.Stdout, `fmt.Println("iGoIsCool")`)
    history := make(map[string]string)
    var instruct In
    for {
        fmt.Print("\n$ ")
        f, err := os.Create("exe.go")
        if err != nil {
            panic(err.Error())
        }
        defer f.Close()
        reader := bufio.NewReader(os.Stdin)
        text, _ := reader.ReadString('\n')
        if history["a"] != "" {
            instruct.F = history["a"]
        }
        instruct.M = text
        if err := t.Execute(f, instruct); err != nil {
            fmt.Println(err.Error())
        }
        if f, err := iGo.NewFunction(text); err != nil {
            fmt.Println(err.Error())
        } else {
            history[f.Identifier] = f.Raw
            for k, v := range history {
                fmt.Printf("%s: %s\n", k, v)
            }
        }
        cmd := exec.Command("goimports", "-w", "exe.go")
        b, err := cmd.Output()
        if err != nil {
            fmt.Println("Error calling goimports", err.Error())
            continue
        }
        fmt.Println(string(b))

        cmd = exec.Command("go", "run", "exe.go")
        b, err = cmd.Output()
        if err != nil {
            fmt.Println("Error calling go run", err.Error())
            continue
        }
        fmt.Println(fmt.Sprintf(">> %s", string(b)))

        os.Remove(path)
    }
}
```

This is what I call some ugly Code!

- There's a loop, processing some user input
- A template which generates the boiler plate of an executable go program
- Some exec.Command().Outputs() which:
  - Run Goimports on the generated Go code (Thank god that's part of the Go toolchain)
  - run the generated code, and reports the output back

This quick 30 min hack was enough validation to continue working. So I began working on parsing out go functions from raw user input

## Parsing Functions

At the moment of writing this, I'm parsing the function by regular expressions.

The in memory representation of a function is:

```go
type Function struct {
    // Raw, the raw input which was determined to be a function
    Raw string

    // Identifier, the identifier of the function.
    // For example:
    // func a() {
    //
    // }
    // Identifier would = a
    Identifier string

    // Params is a raw string which identifies the parameters of the function
    Params string

    // Return is the return signature of the function
    Return string
}
```

And I have some hacked together regexes to parse each piece of a function:

```go
const (
    // holds double duty for classifying, and extracting functions from raw text
    isFunctionExpr regexpType = iota
    identifierExpr
    argsExpr
    returnExpr
)

var expressions = map[regexpType]*regexp.Regexp{
    isFunctionExpr: regexp.MustCompile(`func \(?.*\)?\{\n?(.*|\s|\S)*?(\})`),
    identifierExpr: regexp.MustCompile(`(func .* \(|func .*?)\(`),
    argsExpr:       regexp.MustCompile(`\((.*?)\)`),
    returnExpr:     regexp.MustCompile(`\) .* {`),
}
```

Using the 4 above expression I'm able to piece together each part of a function and store it memory, keyed by its identifier.

For example,

```go
isFunctionExpr: regexp.MustCompile(`func \(?.*\)?\{\n?(.*|\s|\S)*?(\})`),
```

will classify some text as **_is a function_** or **_is not a function_**

for instance:

```go
func hello() int {

}
```

**would** parse, while

```go
function() string {
}
```

**wouldn't** parse

Similarly, the other 3 expressions are able to parse different parts of a function. I'm admittedly not the best at regular expressions so I'm sure there are cleaner ways if coming to the same solution. So this likely won't stay the same forever. But it works pretty well for now. I was very surprised to find that the ability to parse functions quickly gave the ability to do lots of cool things.

After a couple days of hacking on iGo I was able to classify functions, store them in memory, look them up, and generate them on the fly. And as a bonus, since Goimport is so cool, iGo is able to reference 3rd party libraries as well

## Read Interpret Eval

The Interpreter struct is very basic. It holds a map of references to functions, and a history of text the interpreter has seen.

```go
// Interpreter houses the function references and input history
type Interpreter struct {
    Functions map[string]*parse.Function
    History   []string
}
```

Every time a function is recognized as such, it will be placed in Interpreter.Functions (keyed by its ID), that looks like this:

```go
// Interpret will take some text and
// Classify it as either an expression or a function
// If it is a function it will store the reference of the Function in a map
// If the text is classified as an expression, it will evaluate the expression,
// using the function reference map if needed
func (i *Interpreter) Interpret(text string) {
    if i.Functions == nil {
        i.Functions = make(map[string]*parse.Function)
    }
    i.History = append(i.History, text)
    t := i.classify(text)
    for _, tv := range t {
        switch v := tv.(type) {
        case *parse.Function:
            i.Functions[v.Identifier] = v
            fmt.Printf("# %s\n", v.String())
            break
        case *parse.Expression:
            fmt.Printf(">> %s\n", text)
            i.Eval(text)
            break
        }
    }
}
```

By default, we don't eval function declarations right away, I'm just storing them in memory. They'll sit there

- until
  - The session ends (program exits)
  - The user requests to interpret a function which has been defined earlier.
  - At that point the interpreter evals, utilizing the functions declared earlier

```go
case *parse.Expression:
            fmt.Printf(">> %s\n", text)
            i.Eval(text)
            break
        }
```

And the eval code is the same in my 30 min hacked together program, just refactored to use the interpreter which is the core implementation.

## Decoupling the Interpreter From Input

When a started this project I began with a simple Terminal based input system. That worked, relatively well but wasn't much fun. I quickly outgrew that and the quickest way to stress test my function parsing was to allow a more robust transfer mechanism from _User_ to _Interpreter_. I wrote a simple HTTP Server which accepts requests and forwards them to the interpreter. Then spits out the result of the code which was interpreted.

That meant I needed to refactor; I began splitting every piece into a module and I ended up with a package structure like

- pkg
  - parse
  - interpreter

parse handles the text parsing and classification, and interpreter utilizes the parsed data to implement the interpreter. Once that was done it was easy to accept Client Server Communication.

```go
package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"

    "github.com/beeceej/iGo/pkg/interpreter"
    "github.com/davecgh/go-spew/spew"
)

func main() {
    i := interpreter.Interpreter{}
    http.HandleFunc("/interpret", func(w http.ResponseWriter, r *http.Request) {
        b, _ := ioutil.ReadAll(r.Body)
        defer r.Body.Close()
        var m struct {
            Text string `json:"text"`
        }
        json.Unmarshal(b, &m)
        i.Interpret(m.Text)
    })

    if err := http.ListenAndServe(":9999", nil); err != nil {
        fmt.Println(err.Error())
        spew.Dump(i)
    }
}
```

Notice the last line, if the server fails for any reason, we are able to print out the exact state of the interpreter at the time of crash... (`spew.Dump(i)`). That is powerful, we could hydrate the Interpreter state from any source. Network. FileSystem. CLI Flags.

## Integrations

Since we're able to run the interpreter as a server, we can build many unique clients for it. Editor integrations are fun, and essential to the usability of the interpreter, so here's how that might look in VSCode.

If you're interested in iGo you can find the project [here](https://github.com/beeceej/iGo)

Part 1 of **_Writing a Go Interpreter in Go_**
