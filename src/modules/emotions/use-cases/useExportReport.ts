import { useAppLoadingStore } from '@commons/state/useAppLoadingStore.ts';
import { useLogger } from '@commons/use-cases/useLogger.ts';
import { useDownloadFile } from '@commons/use-cases/useDownloadFile.ts';
import { exportReportRest } from '../api/exportReportRest.ts';
import { MimeFileTypes } from '@commons/models/MimeFileTypes.ts';

export const useExportReport = () => {
    const { showLoader, hideLoader } = useAppLoadingStore();
    const downloadFile = useDownloadFile();
    const log = useLogger();

    return async () => {
        try {
            showLoader();

            const blob = await exportReportRest();

            downloadFile(blob, 'I feel', MimeFileTypes.XLSX);
        } catch (e) {
            log(e as Error, 'Error happens during export emotions report');
        } finally {
            hideLoader();
        }
    }
};
