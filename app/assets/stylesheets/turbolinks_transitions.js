document.addEventListener('page:change', function() {
        document.getElementById('primary-content').className += 'animated flipInX';
});
document.addEventListener('page:fetch', function() {
        document.getElementById('primary-content').className += 'animated flipOutX';
});
