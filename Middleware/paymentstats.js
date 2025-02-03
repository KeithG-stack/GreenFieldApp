document.addEventListener('DOMContentLoaded', () => {
    const classButtons = document.querySelectorAll('.class-button');
    const paymentInfo = document.getElementById('payment-info');
  
    classButtons.forEach(button => {
      button.addEventListener('click', () => {
        const amountOwed = button.getAttribute('data-amount');
        paymentInfo.innerHTML = `<p>Amount owed for this class: $${amountOwed}</p>`;
      });
    });
  });