import opentype from 'opentype.js'
import type {UploadRawFile} from 'element-plus'

export class FontFormatter {
	private readonly glyphs: string | string[]
	private readonly file: UploadRawFile
	private readonly reader: FileReader
	constructor(glyphs: string, file: UploadRawFile) {
		this.glyphs = glyphs
		this.file = file
		this.reader = new FileReader()
		this.reader.onload = () => this.onload(this.reader)
		this.reader.onerror = this.onerror
	}
	onload(reader: FileReader) {
		try {
			const font = opentype.parse(reader.result)
			const postScriptName = font.getEnglishName('postScriptName')
			const [familyName, styleName] = postScriptName.split('-')
			const notDefGlyph = font.glyphs.get(0)
			notDefGlyph.name = '.notDef'
			const subGlyphs = [notDefGlyph].concat(font.stringToGlyphs(this.glyphs))
			const subsetFont = new opentype.Font({
				familyName: familyName,
				styleName: styleName || '?',
				unitsPerEm: font.unitsPerEm,
				ascender: font.ascender,
				descender: font.descender,
				designer: font.getEnglishName('designer'),
				designerURL: font.getEnglishName('designerURL'),
				manufacturer: font.getEnglishName('manufacturer'),
				manufacturerURL: font.getEnglishName('manufacturerURL'),
				license: font.getEnglishName('license'),
				licenseURL: font.getEnglishName('licenseURL'),
				version: font.getEnglishName('version'),
				description: font.getEnglishName('description'),
				copyright: 'This is a subset font of ' + postScriptName + '. ' + font.getEnglishName('copyright'),
				trademark: font.getEnglishName('trademark'),
				glyphs: subGlyphs
			})
			subsetFont.download()
		} catch (error: any) {
			this.onerror(error)
		}
	}
	onerror(error: any) {
		alert(error.message)
		throw(error)
	}
	readAsArrayBuffer() {
		this.reader.readAsArrayBuffer(this.file)
	}
}