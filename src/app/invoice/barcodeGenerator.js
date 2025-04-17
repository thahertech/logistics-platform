import JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';

export const generateBarcode = (value) => {
    const canvas = createCanvas();
    JsBarcode(canvas, value, {
        format: "CODE128",
        width: 2,
        height: 40,
        displayValue: false
    });
    return canvas.toDataURL("image/png");
};