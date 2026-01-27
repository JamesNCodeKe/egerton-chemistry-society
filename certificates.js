document.getElementById("joinForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page reload

  const name = document.getElementById("full-name").value;
  const regNo = document.getElementById("reg-number").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;
  const year = document.getElementById("year-of-study").value;

  const date = new Date().toLocaleDateString();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("landscape");

  // Border
  doc.setLineWidth(1.5);
  doc.rect(10, 10, 277, 190);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("EGERTON UNIVERSITY CHEMISTRY SOCIETY", 148, 40, { align: "center" });

  doc.setFontSize(18);
  doc.text("MEMBERSHIP CERTIFICATE", 148, 60, { align: "center" });

  // Body
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("This is to certify that", 148, 85, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(name.toUpperCase(), 148, 100, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(`Registration Number: ${regNo}`, 148, 118, { align: "center" });
  doc.text(`Course: ${course} (${year} Year)`, 148, 132, { align: "center" });

  doc.text(
    "is hereby recognized as a registered member of the",
    148,
    148,
    { align: "center" }
  );

  doc.setFont("helvetica", "bold");
  doc.text("Egerton University Chemistry Society (EUCCA)", 148, 160, {
    align: "center",
  });

  // Footer
  doc.setFontSize(12);
  doc.text(`Issued on: ${date}`, 30, 180);
  doc.text("Chairperson", 210, 175);
  doc.text("Secretary General", 30, 175);

  // Download
  doc.save(`${name}_EUCCA_Membership_Certificate.pdf`);
});
