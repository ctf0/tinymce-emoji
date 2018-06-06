import EmojiPanel from 'emoji-panel'

tinymce.overrideDefaults({
    toolbar: 'emoji',
    setup(editor) {
        emoji(editor)
    }
})

function emoji(editor) {
    let set = 'emojione'
    let sheetSize = 32
    let content_css = `/assets/vendor/emoji/emoji-panel-${set}-20.css`
    let btn_image = '/vendor/emoji/hugging-face.png'
    let panelContainer = 'emoji-panel'
    let perLine = 8
    let rows = 5
    let width = 7 + perLine * (sheetSize + 12)
    let height = (rows + 1) * (sheetSize + 12)
    let btn
    let panelState = false
    editor.settings.content_css = content_css

    editor.addButton('emoji', {
        type: 'panelbutton',
        image: btn_image,
        tooltip: 'Select An Emoji',
        panel: {
            role: 'application',
            html: `<div id="${panelContainer}" style="width: ${width}px;height: ${height}px;"></div>`,
            onClick(e) {
                e.stopPropagation()
            }
        },
        onClick(e) {
            btn = e
            panelState = true

            if (Array.from(document.querySelectorAll('.ep-categories')).length > 0) {
                return
            }

            new EmojiPanel(document.getElementById(`${panelContainer}`), {
                onClick(emoji) {
                    editor.insertContent(`<img draggable="false" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="ep-e-20" data-index="${emoji.index}" data-unified="${emoji.unified}">`)

                    btn.target.click()
                    panelState = false
                }
            })
        }
    })

    // disable resize for emoji
    editor.on('MouseDown', (e) => {
        if (e.target.classList.contains('ep-e-20')) {
            editor.settings.object_resizing = false
        } else {
            editor.settings.object_resizing = true
        }
    })

    // hide emoji panel on any keyboard press
    editor.on('keydown', () => {
        if (panelState) {
            btn.target.click()
            panelState = false
        }
    })

    // show emoji panel on ":"
    // editor.on('keypress', (e) => {
    //     if (e.keyCode == 58 || e.keyCode == 188) {
    //         btn.target.click()
    //     }
    // })
}
