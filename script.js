// AOS অ্যানিমেশন ইনিশিয়ালাইজ
AOS.init();

// ডাটা লোড করার ফাংশন
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('gallery');
        
        data.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'glass-card';
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', index * 100);
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    
                    <div class="rating-section">
                        <div class="stars" id="stars-${item.id}">
                            <span class="star" data-value="1">&#9733;</span>
                            <span class="star" data-value="2">&#9733;</span>
                            <span class="star" data-value="3">&#9733;</span>
                            <span class="star" data-value="4">&#9733;</span>
                            <span class="star" data-value="5">&#9733;</span>
                        </div>
                        <div class="average-rating" id="avg-rating-${item.id}">
                            গড়: ${item.averageRating} / 5
                        </div>
                    </div>

                    <div class="comments-section">
                        <!-- Giscus কমেন্ট সিস্টেম -->
                        <div class="giscus" 
                            data-repo="shamsulf222-designer/my-portfolio" 
                            data-repo-id="R_kgDOTkkSHQ" 
                            data-category="General" 
                            data-category-id="DIC_kwDOTkkSHc4DCDGW" 
                            data-mapping="specific" 
                            data-term="${item.id}" 
                            data-strict="0" 
                            data-reactions-enabled="1" 
                            data-emit-metadata="0" 
                            data-input-position="bottom" 
                            data-theme="preferred_color_scheme" 
                            data-lang="en" 
                            data-loading="lazy" 
                            crossorigin="anonymous">
                        </div>
                    </div>
                </div>
            `;
            gallery.appendChild(card);

            // রেটিং ফাংশনালিটি
            const stars = card.querySelectorAll('.star');
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const rating = this.getAttribute('data-value');
                    // লোকাল স্টোরেজে সেভ করা হচ্ছে (ডেমো হিসেবে)
                    localStorage.setItem(`rating-${item.id}`, rating);
                    updateStars(item.id, rating);
                    alert(`আপনি ${rating} স্টার রেটিং দিয়েছেন!`);
                });
            });

            // পেইজ লোড হলে আগের রেটিং দেখানো
            const savedRating = localStorage.getItem(`rating-${item.id}`);
            if (savedRating) {
                updateStars(item.id, savedRating);
            }
        });

        // Giscus স্ক্রিপ্ট লোড করার ফাংশন কল করা হচ্ছে
        loadGiscus();
    })
    .catch(error => console.error('Error loading data:', error));

// স্টার আপডেট করার ফাংশন
function updateStars(id, rating) {
    const stars = document.querySelectorAll(`#stars-${id} .star`);
    stars.forEach(star => {
        star.classList.remove('active');
        if (star.getAttribute('data-value') <= rating) {
            star.classList.add('active');
        }
    });
}

// Giscus স্ক্রিপ্ট ডাইনামিকভাবে লোড করার ফাংশন
function loadGiscus() {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    document.body.appendChild(script);
}
