import EmojiPanel from 'emoji-panel'

let set = 'emojione'
let sheetSize = 32
let content_css = `/assets/vendor/emoji/emoji-panel-${set}-20.css`
let btn_image = '/vendor/emoji/hugging-face.png'
let panelContainer = 'emoji-panel'
let perLine = 8
let rows = 5
let width = 7 + perLine * (sheetSize + 12)
let height = (rows + 1) * (sheetSize + 12)

tinymce.overrideDefaults({
    content_css : content_css,
    toolbar: 'emoji',
    setup(editor) {
        editor.addButton('emoji', {
            type: 'panelbutton',
            image: btn_image,
            tooltip: 'Add Emojis',
            panel: {
                role: 'application',
                html: `<div id="${panelContainer}" style="width: ${width}px;height: ${height}px;"></div>`,
                onClick(e) {
                    e.stopPropagation()
                }
            },
            onClick(e) {
                if ($('.ep-categories').length > 0) {
                    return
                }

                new EmojiPanel(document.getElementById(`${panelContainer}`), {
                    onClick(emoji) {
                        editor.insertContent(`<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="ep-e-20" data-index="${emoji.index}" data-unified="${emoji.unified}">`)
                        e.target.click()
                    }
                })
            }
        })

        editor.on('MouseDown', (e) => {
            if ($(e.target).hasClass('ep-e-20')) {
                editor.settings.object_resizing = false
            } else {
                editor.settings.object_resizing = true
            }
        })
    }
})
