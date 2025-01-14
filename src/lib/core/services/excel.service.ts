import * as XLSX from 'xlsx'

export interface ExcelColumn {
  key: string
  header: string
  width?: number
}

export class ExcelService {
  private workbook: XLSX.WorkBook
  private activeSheet: XLSX.WorkSheet | null

  constructor() {
    this.workbook = XLSX.utils.book_new()
    this.activeSheet = null
  }

  createSheet(name: string, data: any[], columns: ExcelColumn[]) {
    // Prepara os headers
    const headers = columns.map(col => col.header)
    
    // Prepara os dados
    const rows = data.map(item => 
      columns.map(col => item[col.key])
    )

    // Cria a worksheet
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows])

    // Ajusta as larguras das colunas
    const colWidths: { [key: string]: number } = {}
    columns.forEach((col, index) => {
      if (col.width) {
        const colLetter = XLSX.utils.encode_col(index)
        colWidths[colLetter] = col.width
      }
    })
    ws['!cols'] = Object.keys(colWidths).map(col => ({ 
      wch: colWidths[col] 
    }))

    // Adiciona a worksheet ao workbook
    XLSX.utils.book_append_sheet(this.workbook, ws, name)
    this.activeSheet = ws

    return this
  }

  setColumnWidths(widths: number[]) {
    if (!this.activeSheet) return this

    this.activeSheet['!cols'] = widths.map(w => ({ wch: w }))
    return this
  }

  styleHeaders() {
    if (!this.activeSheet) return this

    // Implementar estilos de header aqui
    return this
  }

  download(filename: string) {
    XLSX.writeFile(this.workbook, `${filename}.xlsx`)
    return this
  }

  getBuffer(): Buffer {
    return XLSX.write(this.workbook, { type: 'buffer', bookType: 'xlsx' })
  }

  static async parseExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          
          const jsonData = XLSX.utils.sheet_to_json(worksheet)
          resolve(jsonData)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = (error) => reject(error)
      reader.readAsArrayBuffer(file)
    })
  }
} 