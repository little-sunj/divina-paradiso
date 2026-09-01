document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById("intro-screen");
    const introContent = document.getElementById("intro-content");
    const featherContainer = document.getElementById("feather-container");
    const mainContainer = document.getElementById("main-container");
    const detailContainer = document.getElementById("detail-container");
    const closeBtn = document.querySelector(".close-btn");
    
    // ----------------------------------------------------
    // 1. Generate Diverse High-Fidelity SVG Feathers for Intro Screen
    // ----------------------------------------------------
    const featherCount = 75;
    const feathers = [];

    // 5 Distinct High-Quality SVG Feather Templates
    const featherTemplates = [
        // Type 1: Graceful Curved Archangel Wing Feather
        (id) => `
            <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="fgrad1_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="35%" stop-color="#f8fafc" stop-opacity="0.8"/>
                        <stop offset="70%" stop-color="#e2e8f0" stop-opacity="0.5"/>
                        <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
                <!-- Left Vane -->
                <path d="M50,6 C44,18 36,34 32,54 C28,72 32,88 44,104 C47,108 49,111 50,113 C48,98 48,84 47,70 C45,50 48,26 50,6 Z" fill="url(#fgrad1_${id})"/>
                <!-- Right Vane -->
                <path d="M50,6 C56,18 67,34 71,52 C75,70 70,88 59,102 C55,107 52,111 50,113 C51,98 52,82 52,66 C52,48 51,26 50,6 Z" fill="url(#fgrad1_${id})"/>
                <!-- Central Spine/Shaft -->
                <path d="M50,4 Q49,58 48,122" stroke="rgba(255,255,255,0.9)" stroke-width="1.3" stroke-linecap="round" fill="none"/>
                <!-- Realistic Barb splits -->
                <path d="M38,44 L49,50 M34,64 L48,70 M40,82 L49,86 M65,40 L51,46 M68,58 L51,64 M62,76 L50,80" stroke="rgba(255,255,255,0.4)" stroke-width="0.75" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // Type 2: Broad Classic Angelic Feather
        (id) => `
            <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="fgrad2_${id}" x1="20%" y1="0%" x2="80%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="45%" stop-color="#f1f5f9" stop-opacity="0.75"/>
                        <stop offset="80%" stop-color="#e0e7ff" stop-opacity="0.45"/>
                        <stop offset="100%" stop-color="#c7d2fe" stop-opacity="0.15"/>
                    </linearGradient>
                </defs>
                <!-- Full broad body -->
                <path d="M50,5 C58,16 71,32 75,50 C79,70 73,90 61,105 C55,112 52,116 50,118 C48,116 45,112 39,105 C27,90 21,70 25,50 C29,32 42,16 50,5 Z" fill="url(#fgrad2_${id})"/>
                <!-- Spine -->
                <path d="M50,3 L50,124" stroke="rgba(255,255,255,0.92)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
                <!-- Barb textures -->
                <path d="M34,38 L49,46 M30,58 L49,65 M34,78 L49,84 M66,38 L51,46 M70,58 L51,65 M66,78 L51,84" stroke="rgba(255,255,255,0.38)" stroke-width="0.8" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // Type 3: Wind-swept Asymmetric Drift Feather
        (id) => `
            <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="fgrad3_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.92"/>
                        <stop offset="50%" stop-color="#f8fafc" stop-opacity="0.7"/>
                        <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.18"/>
                    </linearGradient>
                </defs>
                <!-- Asymmetric curve -->
                <path d="M54,6 C62,18 76,36 78,56 C80,76 71,94 58,108 C54,112 52,115 50,117 C48,106 43,88 39,72 C33,52 36,30 46,14 C49,10 52,7 54,6 Z" fill="url(#fgrad3_${id})"/>
                <!-- Curved Shaft -->
                <path d="M54,4 Q50,58 48,122" stroke="rgba(255,255,255,0.88)" stroke-width="1.2" stroke-linecap="round" fill="none"/>
                <!-- Barb slits -->
                <path d="M43,36 L51,42 M39,56 L49,62 M41,74 L48,79 M72,42 L53,48 M74,62 L51,68 M66,82 L49,87" stroke="rgba(255,255,255,0.35)" stroke-width="0.75" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // Type 4: Soft & Fluffy Angelic Down Feather (Plume)
        (id) => `
            <svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="fgrad4_${id}" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="40%" stop-color="#fdf4ff" stop-opacity="0.75"/>
                        <stop offset="80%" stop-color="#e0e7ff" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#c4b5fd" stop-opacity="0.1"/>
                    </linearGradient>
                </defs>
                <!-- Soft fluffy multi-lobed shape -->
                <path d="M50,10 C56,20 66,30 70,42 C72,48 68,54 72,60 C76,70 73,82 65,92 C59,100 54,105 50,108 C46,105 41,100 35,92 C27,82 24,70 28,60 C32,54 28,48 30,42 C34,30 44,20 50,10 Z" fill="url(#fgrad4_${id})"/>
                <!-- Soft shaft -->
                <path d="M50,8 L50,114" stroke="rgba(255,255,255,0.8)" stroke-width="1.0" stroke-linecap="round" fill="none"/>
                <!-- Fluffy down barbs -->
                <path d="M34,48 C40,50 45,52 49,54 M31,64 C38,66 44,68 49,70 M36,80 C42,82 46,84 49,86 M66,48 C60,50 55,52 51,54 M69,64 C62,66 56,68 51,70 M64,80 C58,82 54,84 51,86" stroke="rgba(255,255,255,0.45)" stroke-width="0.9" stroke-linecap="round" fill="none"/>
            </svg>
        `,
        // Type 5: Slender & Delicate Floating Breeze Feather
        (id) => `
            <svg viewBox="0 0 90 130" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="fgrad5_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
                        <stop offset="60%" stop-color="#f1f5f9" stop-opacity="0.7"/>
                        <stop offset="100%" stop-color="#93c5fd" stop-opacity="0.2"/>
                    </linearGradient>
                </defs>
                <!-- Slender silhouette -->
                <path d="M45,4 C49,15 56,28 60,46 C63,64 59,82 51,98 C47,105 45,109 45,111 C44,109 42,105 38,98 C30,82 26,64 30,46 C34,28 41,15 45,4 Z" fill="url(#fgrad5_${id})"/>
                <!-- Thin spine -->
                <path d="M45,2 L45,116" stroke="rgba(255,255,255,0.85)" stroke-width="1.1" stroke-linecap="round" fill="none"/>
                <!-- Delicate lines -->
                <path d="M34,36 L44,42 M31,56 L44,61 M34,76 L44,80 M56,36 L46,42 M59,56 L46,61 M56,76 L46,80" stroke="rgba(255,255,255,0.36)" stroke-width="0.7" stroke-linecap="round" fill="none"/>
            </svg>
        `
    ];

    // Generate feathers with depth-of-field variety
    for (let i = 0; i < featherCount; i++) {
        const featherDiv = document.createElement("div");
        featherDiv.className = "feather";
        
        // Pick random feather template
        const templateIdx = i % featherTemplates.length;
        featherDiv.innerHTML = featherTemplates[templateIdx](i);

        // Natural depth distribution (Foreground, Midground, Background)
        const depthTier = Math.random();
        let size, opacity, blurVal;

        if (depthTier < 0.2) {
            // Foreground (large, clear, prominent)
            size = anime.random(48, 68);
            opacity = anime.random(75, 95) / 100;
            blurVal = 0;
            featherDiv.style.zIndex = "5";
        } else if (depthTier < 0.7) {
            // Midground (standard drifting)
            size = anime.random(30, 46);
            opacity = anime.random(45, 75) / 100;
            blurVal = 0;
            featherDiv.style.zIndex = "3";
        } else {
            // Background (tiny, soft atmospheric depth)
            size = anime.random(16, 28);
            opacity = anime.random(25, 45) / 100;
            blurVal = anime.random(0.5, 1.2);
            featherDiv.style.zIndex = "1";
        }

        featherDiv.style.width = `${size}px`;
        featherDiv.style.height = `${size * 1.3}px`;
        featherDiv.style.left = `${anime.random(1, 98)}%`;
        featherDiv.style.top = `${anime.random(1, 98)}%`;

        if (blurVal > 0) {
            featherDiv.style.filter = `drop-shadow(0 2px 6px rgba(200, 215, 255, 0.2)) blur(${blurVal}px)`;
        }

        const initialRotation = anime.random(-60, 60);
        featherDiv.style.transform = `rotate(${initialRotation}deg)`;
        featherDiv.style.opacity = opacity;

        featherContainer.appendChild(featherDiv);
        feathers.push(featherDiv);
    }

    // Natural multi-axis swaying & floating animation for feathers
    const driftAnimation = anime({
        targets: '.feather',
        translateX: () => anime.random(-25, 25),
        translateY: () => anime.random(-35, 35),
        rotate: () => `+=${anime.random(-35, 35)}`,
        scaleY: () => anime.random(90, 105) / 100, // 3D tilt fluttering effect
        duration: () => anime.random(4000, 7500),
        delay: () => anime.random(0, 3000),
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
    // 3. Intro Click Event - Feather Scatter Physics
    // ----------------------------------------------------
    introScreen.addEventListener("click", (e) => {
        driftAnimation.pause();

        const clickX = e.clientX;
        const clickY = e.clientY;

        feathers.forEach((feather) => {
            const rect = feather.getBoundingClientRect();
            const featherX = rect.left + rect.width / 2;
            const featherY = rect.top + rect.height / 2;

            let angle = Math.atan2(featherY - clickY, featherX - clickX);
            if (featherX === clickX && featherY === clickY) {
                angle = Math.random() * Math.PI * 2;
            }
            
            const distance = anime.random(600, 1200);
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;
            const targetRotate = anime.random(-720, 720);

            anime({
                targets: feather,
                translateX: targetX,
                translateY: targetY,
                rotate: targetRotate,
                scale: 0.1,
                opacity: 0,
                duration: anime.random(1200, 1800),
                easing: 'easeOutExpo'
            });
        });

        anime({
            targets: '#intro-content',
            opacity: 0,
            translateY: -100,
            duration: 800,
            easing: 'easeInQuad'
        });

        anime({
            targets: '#intro-screen',
            opacity: 0,
            duration: 1500,
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
