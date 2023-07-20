const activeCategory = window.location.pathname;
const navLink = document.querySelectorAll('.button');

navLink.forEach(link => {
    const navlinkPathname = new URL(link.href).pathname;

    if(activeCategory.includes(navlinkPathname)){
        link.classList.add('active');
    }
});