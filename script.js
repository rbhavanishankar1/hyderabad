document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const { jsPDF } = window.jspdf; // Accessing jsPDF from the library
    const doc = new jsPDF();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
    const paymentDate = formatDate(document.getElementById('paymentDate').value); // Format payment date
    const totalAmount = document.getElementById('totalAmount').value;
    const paidAmount = document.getElementById('paidAmount').value;
    const balancePayment = (totalAmount - paidAmount).toFixed(2); // Calculate balance payment

    // Installment details
    const installmentDate1 = formatDate(document.getElementById('installmentDate1').value); 
    const installmentAmount1 = document.getElementById('installmentAmount1').value;

    const installmentDate2 = formatDate(document.getElementById('installmentDate2').value); 
    const installmentAmount2 = document.getElementById('installmentAmount2').value;

    const installmentDate3 = formatDate(document.getElementById('installmentDate3').value); 
    const installmentAmount3 = document.getElementById('installmentAmount3').value;

    const installmentDate4 = formatDate(document.getElementById('installmentDate4').value); 
    const installmentAmount4 = document.getElementById('installmentAmount4').value;

    const address = document.getElementById('address').value;
    const courseName = document.getElementById('courseName').value;
    const certification = document.getElementById('certification').value;

    // Adding content to the PDF
    doc.setFontSize(12); // Set font size for better readability
    doc.text(`Full Name: ${fullName}`, 10, 10);
    doc.text(`Email ID: ${email}`, 10, 20);
    doc.text(`Payment Type: ${paymentType}`, 10, 30);
    doc.text(`Payment Date: ${paymentDate}`, 10, 40);
    doc.text(`Total Amount: ${totalAmount}`, 10, 50);
    doc.text(`Paid Amount: ${paidAmount}`, 10, 60);
    doc.text(`Balance Payment: ${balancePayment}`, 10, 70);

    // Adding installment details conditionally
    if (installmentAmount1 > 0) {
        doc.text(`Installment 1: ${installmentAmount1} on ${installmentDate1}`, 10, 80);
    }
    if (installmentAmount2 > 0) {
        doc.text(`Installment 2: ${installmentAmount2} on ${installmentDate2}`, 10, 90);
    }
    if (installmentAmount3 > 0) {
        doc.text(`Installment 3: ${installmentAmount3} on ${installmentDate3}`, 10, 100);
    }
    if (installmentAmount4 > 0) {
        doc.text(`Installment 4: ${installmentAmount4} on ${installmentDate4}`, 10, 110);
    }

    // Add address, course name, and certification
    doc.text(`Address: ${address}`, 10, 120);
    doc.text(`Course Name: ${courseName}`, 10, 130);
    doc.text(`Certification: ${certification}`, 10, 140);

    // Adding paid amount image
    const paidAmountImage = document.getElementById('paidAmountImage').files[0];
    const addImageToPDF = (imageFile, x, y) => {
        if (imageFile) {
            const imgObj = new Image();
            imgObj.src = URL.createObjectURL(imageFile);
            imgObj.onload = function() {
                doc.addImage(imgObj, 'PNG', x, y, 50, 50); // Adjust the position and size as needed
                doc.save(`${fullName.replace(/ /g, "_")}.pdf`); // Save the PDF after the image is loaded
            };
        } else {
            doc.save(`${fullName.replace(/ /g, "_")}.pdf`); // Save the PDF if no image is provided
        }
    };

    // Add the paid amount image
    addImageToPDF(paidAmountImage, 10, 150); // Position the image below the installment details
});

// Function to format date to DD-MM-YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad with zero
    const year = date.getFullYear(); // Get full year
    return `${day}-${month}-${year}`; // Return formatted date
}