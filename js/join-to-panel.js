document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
        event.preventDefault();
        window.open('/admin/login/', '_blank');
    }
});