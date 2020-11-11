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
