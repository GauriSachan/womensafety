document.getElementById('subscribeForm').addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    if(email) {
        document.getElementById('subscribeMessage').innerText = `Thank you for subscribing, ${email}!`;
        document.getElementById('email').value = '';
    }
});
