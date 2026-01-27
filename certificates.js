document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("joinForm");
    
    // Make sure these match your HTML IDs exactly
    const templateImg = document.getElementById("cert-template");
    const logoLeft = document.getElementById("logo-left");
    const logoRight = document.getElementById("logo-right");

    if (!form || !templateImg) {
        console.error("Error: Form or Template Image not found.");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // 1. Wait for the sexy font
        await document.fonts.load('10px "Great Vibes"');

        if (!window.jspdf) {
            alert("Error: jsPDF library is missing.");
            return;
        }

        try {
            const canvas = document.createElement("canvas");
            // Define 'w' and 'h' here so we can use them later
            const w = templateImg.naturalWidth;
            const h = templateImg.naturalHeight;
            canvas.width = w;
            canvas.height = h;
            
            const ctx = canvas.getContext("2d");

            // 2. Draw Template
            ctx.drawImage(templateImg, 0, 0);

            // 3. Draw Logos (Optional)
            const logoSize = w * 0.12;
            const logoY = h * 0.05;
            const logoMargin = w * 0.05;

            if (logoLeft) ctx.drawImage(logoLeft, logoMargin, logoY, logoSize, logoSize);
            if (logoRight) ctx.drawImage(logoRight, w - logoSize - logoMargin, logoY, logoSize, logoSize);

            // 4. Common Settings
            const centerX = w / 2;
            ctx.textAlign = "center";
            ctx.fillStyle = "#014421"; // Egerton Green

            // --- A. DRAW CLUB TITLE ---
            const titleSize = w * 0.032; 
            ctx.font = `bold ${titleSize}px Helvetica`; 
            // Position: 8% down from top
            ctx.fillText("EGERTON UNIVERSITY CHEMISTRY CLUB", centerX, h * 0.08);


            // --- B. DRAW STUDENT NAME ---
            // 1. Get Input
            let rawName = document.getElementById("full-name").value || "Jacktone Omollah";
            
            // 2. Capitalization Logic (Fixing the rawInput error)
            let titleCaseName = rawName
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // 3. Spacing Logic (Using the Capitalized name now!)
            const finalName = titleCaseName.trim().replace(/\s+/g, "    "); 
            
            // 4. Draw it
            const nameSize = w * 0.085; 
            ctx.font = `${nameSize}px 'Great Vibes'`;
            
            // Position: 55% down from top
            ctx.fillText(finalName, centerX, h * 0.57);


            // 5. Generate PDF
            const imgData = canvas.toDataURL("image/png");
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4"
            });

            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();

            doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            
            // Use a clean filename
            const safeName = titleCaseName.replace(/[^a-zA-Z0-9]/g, "_");
            doc.save(`${safeName}_Certificate.pdf`);

        } catch (error) {
            console.error("Generation Failed:", error);
            alert("Error generating PDF. Check console.");
        }
    });
});