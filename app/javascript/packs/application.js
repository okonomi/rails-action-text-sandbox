// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

require("trix")
require("@rails/actiontext")

const getCurrentLine = (editor) => {
  const document = editor.getDocument()
  const range = editor.getSelectedRange()
  const ret = document.expandRangeToLineBreaksAndSplitBlocks(range)
  return document.getStringAtRange(ret.range)
}

document.addEventListener("trix-selection-change", (event) => {
  const editor = event.target.editor
  console.log(editor.getSelectedRange())
  console.log(getCurrentLine(editor))
})

document.addEventListener("trix-change", (event) => {
  const editor = event.target.editor
  const currentLine = getCurrentLine(editor)
  if (currentLine.match(/^# /)) {
    console.log("heading1")
    editor.deleteInDirection("backward")
    editor.deleteInDirection("backward")
    editor.activateAttribute("heading1")
  } else if (currentLine.match(/^- /)) {
    console.log("bullet list")
    editor.deleteInDirection("backward")
    editor.deleteInDirection("backward")
    editor.activateAttribute("bullet")
  }
})
