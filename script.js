// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile navigation when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item h3');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const faqItem = item.parentElement;
            faqItem.classList.toggle('active');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
// const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });
});



const forms = document.querySelectorAll('.contact-form form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate required fields
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (!isValid) return;

        // Prepare form data
        const formData = new FormData(form);

        // Use POST to submit to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',  // Ensure POST method
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                const successMsg = document.createElement('p');
                successMsg.textContent = 'Thank you for your message! We will get back to you soon.';
                successMsg.style.color = 'green';
                successMsg.style.marginTop = '10px';
                successMsg.classList.add('success-msg');

                // Append success message once
                if (!form.querySelector('.success-msg')) {
                    form.appendChild(successMsg);
                }
                form.reset();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(err => {
            alert('Oops! Something went wrong. Please try again later.');
            console.error(err);
        });
    });
});




// Sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});