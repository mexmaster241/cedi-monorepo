import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { IconDownload, IconSend } from "@tabler/icons-react";
import { useState } from "react";

export function DispersionTab() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleDownloadTemplate = () => {
    const templateUrl = '/templates/dispersion-template.xlsx';
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = 'plantilla-dispersion.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitDispersion = async () => {
    if (!file) return;
    
    // WIP: añadir lógica para enviar la dispersión
    try {
     
      
      console.log('Dispersion submitted successfully');
    } catch (error) {
      console.error('Error submitting dispersion:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-clash-display">Descarga la plantilla</h3>
        <Button
          variant="outline"
          className="w-full sm:w-auto flex items-center gap-2 font-clash-display"
          onClick={handleDownloadTemplate}
        >
          <IconDownload size={18} />
          Descargar plantilla
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-clash-display">Sube tu archivo de dispersión</h3>
        <FileUpload
          onChange={handleFileUpload}
        />
      </div>

      <div className="flex justify-center">
        <Button
          className="flex items-center gap-2 font-clash-display"
          onClick={handleSubmitDispersion}
          disabled={!file}
        >
          <IconSend size={18} />
          Enviar dispersión
        </Button>
      </div>
    </div>
  );
}