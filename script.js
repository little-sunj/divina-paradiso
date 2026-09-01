document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById("intro-screen");
    const introContent = document.getElementById("intro-content");
    const stardustContainer = document.getElementById("stardust-container") || document.getElementById("feather-container");
    const mainContainer = document.getElementById("main-container");
    const detailContainer = document.getElementById("detail-container");
    const closeBtn = document.querySelector(".close-btn");
    
    // ----------------------------------------------------
    // 1. Generate Celestial Stardust & Prism Crystals (5 Magical Types)
    // ----------------------------------------------------
    const stardustCount = 85;
    const stardustElements = [];

    // 5 High-Definition Geometric Celestial Star & Prism Crystal SVG Templates
    const stardustTemplates = [
        // 1. Radiant 4-Pointed Diamond Sparkle Star (영롱한 4각 다이아몬드 별)
        (id) => `
            <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="starGrad1_${id}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
                        <stop offset="35%" stop-color="#fdf4ff" stop-opacity="0.9"/>
                        <stop offset="70%" stop-color="#c084fc" stop-opacity="0.5"/>
                        <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="30" cy="30" r="20" fill="url(#starGrad1_${id})" opacity="0.65"/>
                <path d="M30,2 Q30,30 2,30 Q30,30 30,58 Q30,30 58,30 Q30,30 30,2 Z" fill="#ffffff"/>
                <path d="M30,14 Q30,30 14,30 Q30,30 30,46 Q30,30 46,30 Q30,30 30,14 Z" fill="rgba(230, 215, 255, 0.9)" transform="rotate(45 30 30)"/>
                <circle cx="30" cy="30" r="3.5" fill="#ffffff"/>
                <circle cx="30" cy="30" r="1.5" fill="#fef08a"/>
            </svg>
        `,
        // 2. 8-Pointed Archangel Celestial Star (8각 대천사 성광 별빛)
        (id) => `
            <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="starGrad2_${id}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
                        <stop offset="30%" stop-color="#fef08a" stop-opacity="0.85"/>
                        <stop offset="65%" stop-color="#a855f7" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="40" cy="40" r="16" stroke="rgba(240, 225, 255, 0.6)" stroke-width="0.8" fill="none"/>
                <path d="M40,0 Q40,40 0,40 Q40,40 40,80 Q40,40 80,40 Q40,40 40,0 Z" fill="url(#starGrad2_${id})"/>
                <path d="M40,3 Q40,40 3,40 Q40,40 40,77 Q40,40 77,40 Q40,40 40,3 Z" fill="#ffffff"/>
                <path d="M40,12 Q40,40 12,40 Q40,40 40,68 Q40,40 68,40 Q40,40 40,12 Z" fill="rgba(245, 235, 255, 0.92)" transform="rotate(45 40 40)"/>
                <circle cx="40" cy="40" r="4.5" fill="#ffffff"/>
            </svg>
        `,
        // 3. Faceted Prism Diamond Crystal (각진 프리즘 수정 다이아몬드)
        (id) => `
            <svg viewBox="0 0 50 65" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="crystA_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="100%" stop-color="#a855f7" stop-opacity="0.45"/>
                    </linearGradient>
                    <linearGradient id="crystB_${id}" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#e0e7ff" stop-opacity="0.95"/>
                        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.5"/>
                    </linearGradient>
                </defs>
                <polygon points="25,2 5,26 25,26" fill="url(#crystA_${id})"/>
                <polygon points="25,2 45,26 25,26" fill="url(#crystB_${id})"/>
                <polygon points="25,26 5,26 25,62" fill="url(#crystB_${id})"/>
                <polygon points="25,26 45,26 25,62" fill="url(#crystA_${id})"/>
                <polygon points="25,10 15,26 25,48 35,26" fill="#ffffff" opacity="0.65"/>
                <polygon points="25,2 45,26 25,62 5,26" stroke="#ffffff" stroke-width="1.3" fill="none"/>
                <line x1="25" y1="2" x2="25" y2="62" stroke="#ffffff" stroke-width="1.0"/>
                <line x1="5" y1="26" x2="45" y2="26" stroke="#ffffff" stroke-width="1.0"/>
            </svg>
        `,
        // 4. Sacred Shimmer Cross Flare (신성한 십자 광채 & 링)
        (id) => `
            <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="flareGrad_${id}" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
                        <stop offset="35%" stop-color="#fdf4ff" stop-opacity="0.85"/>
                        <stop offset="70%" stop-color="#c084fc" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <ellipse cx="35" cy="35" rx="30" ry="7" stroke="rgba(224, 210, 255, 0.55)" stroke-width="1.1" fill="none" transform="rotate(-30 35 35)"/>
                <line x1="35" y1="2" x2="35" y2="68" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
                <line x1="2" y1="35" x2="68" y2="35" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
                <circle cx="35" cy="35" r="15" fill="url(#flareGrad_${id})"/>
                <circle cx="35" cy="35" r="4" fill="#ffffff"/>
            </svg>
        `,
        // 5. Glowing Stardust Pearl Orb (신비로운 빛의 보석 구체)
        (id) => `
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="orbGrad_${id}" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
                        <stop offset="30%" stop-color="#fef08a" stop-opacity="0.95"/>
                        <stop offset="70%" stop-color="#c084fc" stop-opacity="0.6"/>
                        <stop offset="100%" stop-color="#6366f1" stop-opacity="0.1"/>
                    </radialGradient>
                </defs>
                <circle cx="20" cy="20" r="16" fill="rgba(192, 132, 252, 0.3)"/>
                <circle cx="20" cy="20" r="10" fill="url(#orbGrad_${id})"/>
                <circle cx="16" cy="16" r="3.2" fill="#ffffff" opacity="0.95"/>
                <path d="M20,6 L20,34 M6,20 L34,20" stroke="rgba(255, 255, 255, 0.75)" stroke-width="0.9" stroke-linecap="round"/>
            </svg>
        `
    ];

    // Generate Stardust elements with multi-tiered depth
    for (let i = 0; i < stardustCount; i++) {
        const itemDiv = document.createElement("div");
        itemDiv.className = "stardust-item";
        
        const templateIdx = i % stardustTemplates.length;
        itemDiv.innerHTML = stardustTemplates[templateIdx](i);

        const depthTier = Math.random();
        let size, opacity, blurVal;

        if (depthTier < 0.25) {
            // Foreground (Large brilliant crystal stars)
            size = anime.random(34, 48);
            opacity = anime.random(85, 100) / 100;
            blurVal = 0;
            itemDiv.style.zIndex = "5";
        } else if (depthTier < 0.7) {
            // Midground (Standard glowing stars)
            size = anime.random(20, 32);
            opacity = anime.random(60, 85) / 100;
            blurVal = 0;
            itemDiv.style.zIndex = "3";
        } else {
            // Background (Tiny shimmering stardust dots)
            size = anime.random(10, 18);
            opacity = anime.random(35, 60) / 100;
            blurVal = anime.random(0.3, 0.8);
            itemDiv.style.zIndex = "1";
        }

        itemDiv.style.width = `${size}px`;
        itemDiv.style.height = `${size}px`;
        itemDiv.style.left = `${anime.random(2, 98)}%`;
        itemDiv.style.top = `${anime.random(2, 98)}%`;

        if (blurVal > 0) {
            itemDiv.style.filter = `drop-shadow(0 0 6px rgba(255, 255, 255, 0.7)) blur(${blurVal}px)`;
        }

        const initialRotation = anime.random(0, 360);
        itemDiv.style.transform = `rotate(${initialRotation}deg)`;
        itemDiv.style.opacity = opacity;

        stardustContainer.appendChild(itemDiv);
        stardustElements.push(itemDiv);
    }

    // Shimmering, Twinkling & Gentle Floating Animation Loop
    const idleTwinkleAnimation = anime({
        targets: '.stardust-item',
        scale: () => [anime.random(65, 85) / 100, anime.random(115, 140) / 100],
        opacity: () => [anime.random(30, 60) / 100, anime.random(85, 100) / 100],
        translateY: () => anime.random(-15, 15),
        translateX: () => anime.random(-12, 12),
        rotate: () => `+=${anime.random(-30, 30)}`,
        duration: () => anime.random(2200, 4800),
        delay: () => anime.random(0, 2000),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // ----------------------------------------------------
    // 2. Three.js WebGL 3D Planets Integration
    // ----------------------------------------------------
    let moonMesh, earthMesh;
    let moonRenderer, earthRenderer;
    let moonScene, earthScene;
    let moonCamera, earthCamera;



    // --- PROCEDURAL FANTASY TEXTURE GENERATORS ---
    
    // Generates a Silver-White Marble Moon with gold craters for a celestial vibe
    function createMoonTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // 1. Soft silver-white gradient base
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#f8fafc');
        grad.addColorStop(0.5, '#e2e8f0');
        grad.addColorStop(1, '#cbd5e1');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // 2. Delicate marble veins (fractured sacred lines)
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * 512, 0);
            ctx.bezierCurveTo(
                Math.random() * 512, Math.random() * 256,
                Math.random() * 512, 256 + Math.random() * 256,
                Math.random() * 512, 512
            );
            ctx.stroke();
        }

        // 3. Golden craters (magical impact markings)
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const r = 12 + Math.random() * 28;

            const goldGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
            goldGrad.addColorStop(0, 'rgba(253, 224, 71, 0.15)'); // soft gold center
            goldGrad.addColorStop(0.8, 'rgba(234, 179, 8, 0.05)');
            goldGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = goldGrad;
            ctx.fill();

            // Gold rim ring
            ctx.strokeStyle = 'rgba(234, 179, 8, 0.22)';
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        // 4. White stardust sparkles
        for (let i = 0; i < 600; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
            ctx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
        }

        return new THREE.CanvasTexture(canvas);
    }

    // Generates a cosmic nebula Earth with aurora currents and golden star ash
    function createEarthTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // 1. Deep cosmic ocean base
        ctx.fillStyle = '#030712';
        ctx.fillRect(0, 0, 1024, 512);

        const seaGrad = ctx.createRadialGradient(512, 256, 120, 512, 256, 550);
        seaGrad.addColorStop(0, '#0b1e3d');
        seaGrad.addColorStop(0.6, '#13284d');
        seaGrad.addColorStop(1, '#02040a');
        ctx.fillStyle = seaGrad;
        ctx.fillRect(0, 0, 1024, 512);

        // 2. Swirling emerald/cyan ether auroras (replacing static landmasses)
        for (let i = 0; i < 14; i++) {
            const cx = 100 + Math.random() * 824;
            const cy = 100 + Math.random() * 312;
            const rx = 160 + Math.random() * 240;
            const ry = 70 + Math.random() * 110;

            const etherGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
            etherGrad.addColorStop(0, 'rgba(16, 185, 129, 0.25)'); // glowing emerald green
            etherGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.16)'); // cyan blue flow
            etherGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(1, ry / rx); // stretch into horizontal flows
            ctx.beginPath();
            ctx.arc(0, 0, rx, 0, Math.PI * 2);
            ctx.fillStyle = etherGrad;
            ctx.fill();
            ctx.restore();
        }

        // 3. Golden stellar dust belts orbiting along the equator
        ctx.fillStyle = 'rgba(253, 224, 71, 0.65)';
        for (let i = 0; i < 350; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 512;
            const size = 1.2 + Math.random() * 2.2;
            
            // Limit coordinate distribution to create a celestial belt flow
            if (Math.abs(y - 256) < 160) {
                ctx.fillStyle = Math.random() > 0.5 ? 'rgba(253, 224, 71, 0.7)' : 'rgba(255, 255, 255, 0.75)';
                ctx.fillRect(x, y, size, size);
            }
        }

        // 4. Ethereal atmospheric cloud dust
        for (let i = 0; i < 8; i++) {
            const cx = Math.random() * 1024;
            const cy = Math.random() * 512;
            const r = 90 + Math.random() * 180;

            const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            cloudGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
            cloudGrad.addColorStop(0.5, 'rgba(167, 139, 250, 0.08)'); // soft celestial purple clouds
            cloudGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = cloudGrad;
            ctx.fill();
        }

        return new THREE.CanvasTexture(canvas);
    }

    // --- SECURE LOCAL TEXTURE BINDER (Bypasses local file:// CORS blocks) ---
    function setupPlanetTexture(imgId, material, fallbackFunc, property = 'map') {
        const img = document.getElementById(imgId);
        if (!img) {
            material[property] = fallbackFunc();
            material.needsUpdate = true;
            return;
        }

        const apply = () => {
            try {
                // Convert the preloaded browser image tag into a ThreeJS Texture
                const texture = new THREE.Texture(img);
                texture.needsUpdate = true;
                material[property] = texture;
                material.needsUpdate = true;
            } catch (e) {
                // If browser local security still blocks the bitmap mapping, apply procedural canvas texture
                material[property] = fallbackFunc();
                material.needsUpdate = true;
            }
        };

        if (img.complete && img.naturalWidth !== 0) {
            apply();
        } else {
            img.onload = apply;
            img.onerror = () => {
                // Fail-safe trigger: fall back to magical gradients
                material[property] = fallbackFunc();
                material.needsUpdate = true;
            };
        }
    }

    function init3DPlanets() {
        const isMobile = window.innerWidth <= 900;
        const isLocalFile = window.location.protocol === 'file:';
        
        // Define exact sizing boundaries for desktop/mobile
        const moonSize = isMobile ? 140 : 220;
        const earthSize = isMobile ? 1000 : 1800;

        const textureLoader = new THREE.TextureLoader();

        // --- A. MOON 3D SETUP ---
        const moonContainer = document.getElementById("moon-canvas-container");
        
        moonScene = new THREE.Scene();
        moonCamera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 1000);
        moonCamera.position.z = 2.8;

        moonRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        moonRenderer.setSize(moonSize, moonSize);
        moonRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        moonContainer.appendChild(moonRenderer.domElement);

        // Moon Lights
        const moonAmbient = new THREE.AmbientLight(0xffffff, 0.22);
        moonScene.add(moonAmbient);

        const moonDirectional = new THREE.DirectionalLight(0xfff5e6, 1.4);
        moonDirectional.position.set(5, 3, 5);
        moonScene.add(moonDirectional);

        // Moon material setup
        const moonMaterial = new THREE.MeshStandardMaterial({
            roughness: 0.95,
            metalness: 0.02,
            transparent: true,
            opacity: 0.85
        });

        // Smart CORS Bypass check: If loaded via file:// protocol directly, enforce offline procedural texture
        if (isLocalFile) {
            moonMaterial.map = createMoonTexture();
            moonMaterial.needsUpdate = true;
        } else {
            // If running on a local web server (http://), load custom images safely
            setupPlanetTexture("img-moon", moonMaterial, createMoonTexture);
        }

        const moonGeometry = new THREE.SphereGeometry(1, 64, 64);
        moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonScene.add(moonMesh);


        // --- B. EARTH 3D SETUP ---
        const earthContainer = document.getElementById("earth-canvas-container");
        
        earthScene = new THREE.Scene();
        earthCamera = new THREE.PerspectiveCamera(40, 1.0, 0.1, 1000);
        earthCamera.position.z = 3.25;

        earthRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        earthRenderer.setSize(earthSize, earthSize);
        earthRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        earthContainer.appendChild(earthRenderer.domElement);

        // Earth Lights
        const earthAmbient = new THREE.AmbientLight(0x567bfa, 0.35); // Slight blue/purple space shadow tone
        earthScene.add(earthAmbient);

        const earthDirectional = new THREE.DirectionalLight(0xffffff, 1.8);
        earthDirectional.position.set(2, 5, 4);
        earthScene.add(earthDirectional);

        // Earth material setup
        const earthMaterial = new THREE.MeshStandardMaterial({
            roughness: 0.65,
            metalness: 0.05,
            transparent: true,
            opacity: 0.88
        });

        if (isLocalFile) {
            // Apply offline procedural fantasy texture for local files to bypass CORS crash
            earthMaterial.map = createEarthTexture();
            earthMaterial.needsUpdate = true;
        } else {
            // Use earth_night.jpg as the primary map for a unified dark fantasy night globe
            setupPlanetTexture("img-earth-night", earthMaterial, createEarthTexture);
            
            // Set emissive brightness, then bind Earth Night lights to emissiveMap for glowing cities
            earthMaterial.emissive = new THREE.Color(0xbbbbbb);
            setupPlanetTexture("img-earth-night", earthMaterial, () => null, "emissiveMap");
        }

        const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
        earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        earthScene.add(earthMesh);

        // Tilt earth axis (23.5 degrees)
        earthMesh.rotation.z = 0.41;

        // Resize callback
        window.addEventListener("resize", handleResize);

        // Run rendering tick
        tickPlanets();
    }

    function handleResize() {
        const isMobile = window.innerWidth <= 900;

        const moonSize = isMobile ? 140 : 220;
        const earthSize = isMobile ? 1000 : 1800;

        // Update Moon
        if (moonRenderer && moonCamera) {
            moonCamera.aspect = 1.0;
            moonCamera.updateProjectionMatrix();
            moonRenderer.setSize(moonSize, moonSize);
        }

        // Update Earth
        if (earthRenderer && earthCamera) {
            earthCamera.aspect = 1.0;
            earthCamera.updateProjectionMatrix();
            earthRenderer.setSize(earthSize, earthSize);
        }
    }

    // 3D Rendering & Interaction Loop
    function tickPlanets() {
        requestAnimationFrame(tickPlanets);

        // 자전
        if (moonMesh) {
            moonMesh.rotation.y += 0.0004;
        }
        if (earthMesh) {
            earthMesh.rotation.y += 0.0001;
        }



        // 렌더링
        if (moonRenderer && moonScene && moonCamera) {
            moonRenderer.render(moonScene, moonCamera);
        }
        if (earthRenderer && earthScene && earthCamera) {
            earthRenderer.render(earthScene, earthCamera);
        }
    }

    // Pre-initialize 3D scene immediately
    init3DPlanets();

    // ----------------------------------------------------
    // 3. Intro Click Event - Radiant Stardust Scatter & Shockwave Physics
    // ----------------------------------------------------
    introScreen.addEventListener("click", (e) => {
        idleTwinkleAnimation.pause();

        const clickX = e.clientX;
        const clickY = e.clientY;

        // 1. Create Radiant Shockwave Ripple Ring at Click Coordinates
        const shockwave = document.createElement("div");
        shockwave.className = "stardust-shockwave";
        shockwave.style.left = `${clickX}px`;
        shockwave.style.top = `${clickY}px`;
        introScreen.appendChild(shockwave);

        anime({
            targets: shockwave,
            scale: [0, 8],
            opacity: [1, 0],
            duration: 1100,
            easing: 'easeOutQuart',
            complete: () => {
                shockwave.remove();
            }
        });

        // 2. Disperse Stardust and Crystals outward in a sparkling burst
        stardustElements.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemX = rect.left + rect.width / 2;
            const itemY = rect.top + rect.height / 2;

            let angle = Math.atan2(itemY - clickY, itemX - clickX);
            if (itemX === clickX && itemY === clickY) {
                angle = Math.random() * Math.PI * 2;
            }
            
            // Random explosion physics distance
            const distance = anime.random(700, 1500);
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            const targetRotate = anime.random(-1080, 1080);

            anime({
                targets: item,
                translateX: targetX,
                translateY: targetY,
                rotate: targetRotate,
                scale: [
                    { value: 1.6, duration: 150, easing: 'easeOutQuad' }, // Instant brilliant flash
                    { value: 0, duration: anime.random(800, 1300), easing: 'easeInQuad' } // Dissolve
                ],
                opacity: [
                    { value: 1, duration: 150 },
                    { value: 0, duration: anime.random(800, 1300), easing: 'easeInQuad' }
                ],
                duration: anime.random(900, 1500),
                easing: 'easeOutExpo'
            });
        });

        // 3. Fade out Title and Intro Screen smoothly
        anime({
            targets: '#intro-content',
            opacity: 0,
            scale: 0.95,
            translateY: -80,
            duration: 800,
            easing: 'easeInQuad'
        });

        anime({
            targets: '#intro-screen',
            opacity: 0,
            duration: 1400,
            easing: 'easeOutQuad',
            complete: () => {
                introScreen.classList.add("hidden");
                revealMainPage();
            }
        });
    });

    // ----------------------------------------------------
    // 4. Reveal Main Space Container
    // ----------------------------------------------------
    function revealMainPage() {
        mainContainer.classList.remove("hidden");
        
        // Setup initial position for reveal fly-in
        anime.set('.moon-wrapper', { translateY: -250, opacity: 0 });
        anime.set('.earth-wrapper', { translateY: 350, opacity: 0 });
        anime.set('.orbit-line-wrapper', { scaleX: 0, opacity: 0 });

        // Trigger ThreeJS resize once visible to match canvas dimensions exactly
        handleResize();

        const entryTimeline = anime.timeline({
            easing: 'easeOutQuint',
            duration: 1600
        });

        entryTimeline
            .add({
                targets: '.moon-wrapper',
                translateY: 0,
                opacity: 1,
            }, 100)
            .add({
                targets: '.earth-wrapper',
                translateY: 0,
                opacity: 1,
            }, 200)
            .add({
                targets: '.orbit-line-wrapper',
                scaleX: [0, 1],
                opacity: [0, 1],
                delay: anime.stagger(180),
                duration: 1200,
                easing: 'easeOutExpo',
                complete: () => {
                    startPerpetualAnimations();
                }
            }, 400);
    }

    // ----------------------------------------------------
    // 5. Perpetual Moon Glow and Earth Floating Loops
    // ----------------------------------------------------
    function startPerpetualAnimations() {
        // Pulsing Moon Glow
        anime({
            targets: '.moon-glow',
            scale: [1, 1.18, 1],
            opacity: [0.7, 1, 0.7],
            duration: 5000,
            loop: true,
            easing: 'easeInOutSine'
        });
        
        // Gentle float animation on Earth wrapping container
        anime({
            targets: '.earth-wrapper',
            translateY: [0, -10, 0],
            duration: 8000,
            loop: true,
            easing: 'easeInOutQuad'
        });
    }

    // ----------------------------------------------------
    // 6. Interactive Orbits & Layer Selection
    // ----------------------------------------------------
    const orbitWrappers = document.querySelectorAll(".orbit-line-wrapper");
    orbitWrappers.forEach((wrapper) => {
        wrapper.addEventListener("click", () => {
            const layerNum = wrapper.getAttribute("data-layer");
            openDetailView(layerNum);
        });
    });

    // Transition into Layer Detail card Overlay
    function openDetailView(layerNum) {
        const exitTimeline = anime.timeline({
            easing: 'easeOutExpo',
            duration: 900
        });

        exitTimeline
            .add({
                targets: '.moon-wrapper',
                translateY: -250,
                opacity: 0
            }, 0)
            .add({
                targets: '.earth-wrapper',
                translateY: 350,
                opacity: 0
            }, 0)
            .add({
                targets: '.orbit-line-wrapper',
                opacity: 0,
                scale: 0.8,
                delay: anime.stagger(60)
            }, 0)
            .add({
                targets: '#detail-container',
                opacity: [0, 1],
                begin: () => {
                    detailContainer.classList.remove("hidden");
                    document.querySelectorAll(".detail-card").forEach(card => card.classList.remove("active"));
                    document.getElementById(`detail-${layerNum}`).classList.add("active");
                }
            }, 300)
            .add({
                targets: `#detail-${layerNum}`,
                translateY: [100, 0],
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutElastic(1, .8)'
            }, 450)
            .add({
                targets: '.close-btn',
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 500
            }, 600);
    }

    // Transition back from Detail card Overlay to Space View
    closeBtn.addEventListener("click", () => {
        const activeCard = document.querySelector(".detail-card.active");
        
        const returnTimeline = anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
        });

        returnTimeline
            .add({
                targets: activeCard,
                translateY: 100,
                opacity: 0,
                duration: 600
            }, 0)
            .add({
                targets: '.close-btn',
                opacity: 0,
                duration: 400
            }, 0)
            .add({
                targets: '#detail-container',
                opacity: 0,
                complete: () => {
                    detailContainer.classList.add("hidden");
                }
            }, 200)
            .add({
                targets: '.moon-wrapper',
                translateY: 0,
                opacity: 1
            }, 350)
            .add({
                targets: '.earth-wrapper',
                translateY: 0,
                opacity: 1
            }, 350)
            .add({
                targets: '.orbit-line-wrapper',
                opacity: 1,
                scale: 1,
                delay: anime.stagger(60)
            }, 350);
    });
});
