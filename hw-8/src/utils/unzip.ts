import AdmZip from 'adm-zip'

export const unzip = (filePath: string, destinationDir: string) => {
  const zip = new AdmZip(filePath)
  zip.extractAllTo(destinationDir, true);
}