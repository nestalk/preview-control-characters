Preview Control Charactors
==========================

The preview-control-characters [Visual Studio Code](https://code.visualstudio.com/) extension lets you view the control 
characters of a text file using the [control pictures](https://en.wikipedia.org/wiki/Unicode_control_characters#Control_pictures) block of unicode.


To run the extension. You need to have a file open.

Press `F1` on Windows (cmd+P on Mac), type `Preview Control Characters`, press `Enter`

## **Setting additional options**

 1. choose 'Preference -> UserSettings'
 2. Find: Preview Control Characters in Default Settings
 3. Copy and paste to settings.json

example: 
```
//-------- Preview Control Characters Option Configuration --------

// add a new line character after a carrige return
"previewControlCharacters.newLineAfterCR": false,

// add a new line character after a line feed
"previewControlCharacters.newLineAfterLF": true,

// show preview window using monospaced fonts
"previewControlCharacters.monospaceFont": false,

// translate spaces to control character
"previewControlCharacters.translateSpace": true
```