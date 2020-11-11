import Trix from 'trix'

Trix.config.blockAttributes.heading2 = {
  tagName: "h2",
  terminal: true,
  breakOnReturn: true,
  group: false,
}
Trix.config.blockAttributes.heading3 = {
  tagName: "h3",
  terminal: true,
  breakOnReturn: true,
  group: false,
}

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
  const document = editor.getDocument()

  const currentLine = getCurrentLine(editor)
  if (currentLine.match(/^# /)) {
    console.log("heading1")
    if (editor.canActivateAttribute("heading1")) {
      editor.deleteInDirection("backward")
      editor.deleteInDirection("backward")
      editor.activateAttribute("heading1")
    }
  } else if (currentLine.match(/^## /)) {
    console.log("heading2")
    if (editor.canActivateAttribute("heading2")) {
      editor.deleteInDirection("backward")
      editor.deleteInDirection("backward")
      editor.deleteInDirection("backward")
      editor.activateAttribute("heading2")
    }
  } else if (currentLine.match(/^### /)) {
    console.log("heading3")
    if (editor.canActivateAttribute("heading3")) {
      editor.deleteInDirection("backward")
      editor.deleteInDirection("backward")
      editor.deleteInDirection("backward")
      editor.deleteInDirection("backward")
      editor.activateAttribute("heading3")
    }
  } else if (currentLine.match(/^- /)) {
    console.log("bullet list")
    if (editor.canActivateAttribute("bullet")) {
      editor.deleteInDirection("backward")
      editor.deleteInDirection("backward")
      editor.activateAttribute("bullet")
    }
  }
})
