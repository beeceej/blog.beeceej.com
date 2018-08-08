const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
/*
ID        string    `json:"id"`
	Title     string    `json:"title"`
	Author    string    `json:"author"`
	Body      string    `json:"body"`
	PostedAt  time.Time `json:"postedAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	Visible   bool  */

fs.readdir('posts/md', (err, files) => {
  if (err) {
    console.log(err)
    return 'Eror Reading Directory...'
  }
  console.log(files)
  files.forEach((file, index) => {
    fs.readFile(path.join('posts', 'md', file), 'utf-8', (err, contents) => {
      if (err) {
        console.log(err)
        return 'Error Reading File...'
      }
      meta = captureMeta(contents)
      meta['body'] = removeComments(contents)
      meta['hash'] = crypto
        .createHash('md5')
        .update(contents, 'binary')
        .digest('hex')
      if (meta['visible'] === 'true') {
        meta['visible'] = true
      } else {
        meta['visible'] = false
      }
      fs.writeFile(
        path.join('posts', 'json', `${meta['id']}.json`),
        JSON.stringify(meta, null, 2),
        err => {
          if (err) {
            return console.log(err)
          }

          console.log('The file was saved!')
        }
      )
      console.log()
    })
  })
})

const removeComments = it => it.replace(/((\<\!--)(.+):(.+)(--\>)\n)/gm, '')
const captureMeta = it => {
  let matches
  let regex = /((\<\!--)(.+):(.+)(--\>))/gm
  let fieldIndex = 3
  let valIndex = 4
  let meta = []
  while ((matches = regex.exec(it)) !== null) {
    if (matches.index === regex.lastIndex) {
      regex.lastIndex++
    }
    const field = matches[fieldIndex]
    const val = matches[valIndex]
    const _tmp = {}
    _tmp[field] = val.trim()
    meta = meta.concat(meta, _tmp)
  }
  uniqueMeta = meta.filter(
    (value, index, self) => self.indexOf(value) === index
  )
  let merged = {}
  uniqueMeta.forEach(o => Object.assign(merged, o))
  return merged
}
