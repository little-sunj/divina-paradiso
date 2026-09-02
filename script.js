document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById("intro-screen");
    const introContent = document.getElementById("intro-content");
    const stardustContainer = document.getElementById("stardust-container") || document.getElementById("feather-container");
    const mainContainer = document.getElementById("main-container");
    const detailContainer = document.getElementById("detail-container");
    const closeBtn = document.querySelector(".close-btn");
    // ----------------------------------------------------
    // 1. Three.js WebGL 3D Planets Integration
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
    // 2. Intro Click Event - Smooth Transition to Main View & BGM Start
    // ----------------------------------------------------
    introScreen.addEventListener("click", () => {
        // Auto start background music on first interaction
        tryStartBgm();

        // Fade out Title and Intro Content smoothly
        anime({
            targets: '#intro-content',
            opacity: 0,
            scale: 0.95,
            translateY: -40,
            duration: 600,
            easing: 'easeInQuad'
        });

        // Fade out Intro Screen overlay
        anime({
            targets: '#intro-screen',
            opacity: 0,
            duration: 900,
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
    // 6. Dynamic Floors Data Loader (from data/floors.json)
    // ----------------------------------------------------
    const orbitsContainer = document.getElementById("orbits-container");
    const detailCardsContainer = document.getElementById("detail-cards-container");
    const worldviewModal = document.getElementById("worldview-modal");
    const charactersModal = document.getElementById("characters-modal");
    const btnOpenWorldview = document.getElementById("btn-open-worldview");
    const btnCloseWorldview = document.getElementById("btn-close-worldview");
    const btnOpenCharacters = document.getElementById("btn-open-characters");
    const btnCloseCharacters = document.getElementById("btn-close-characters");
    const charTabsContainer = document.getElementById("char-tabs-container");
    const charPanesContainer = document.getElementById("char-panes-container");

    let floorsList = [];

    const defaultFloors = [
        {
            floor: 7,
            roman: "VII",
            phase: "월식",
            phaseEn: "Eclipse",
            icon: "fa-solid fa-circle-notch",
            title: "7층: 붉은 관문",
            name: "붉은 관문",
            spinnerClass: "spinner-7",
            orbitClass: "orbit-floor-7",
            sparkleClass: "sparkle-crimson",
            category: "TOWER OF MOON'S SHADOW · APEX (7F)",
            badge: "FINAL FLOOR 07",
            phaseSymbol: "월식 (Lunar Eclipse)",
            imgClass: "floor-img-7",
            isBossCard: true,
            description: "월식의 핏빛 달빛이 내리쬐는 탑의 최정상이자, 굳게 봉쇄되어버린 천계 관문 '월구(Moon Sphere)'의 거대한 문이 자리한 최후의 성소입니다. 지상에 버려진 채 인계 침식의 위기를 딛고 오른 제9품계 하급 천사 일행이 마침내 마주하게 되는 미지의 종착지입니다.",
            characters: [
                { char: "nebbia", name: "네비아" },
                { char: "helio", name: "헬리오" },
                { char: "sinope", name: "시노페" },
                { char: "calliste", name: "칼리스테" }
            ]
        },
        {
            floor: 6,
            roman: "VI",
            phase: "하현",
            phaseEn: "Last Quarter",
            icon: "fa-solid fa-moon fa-flip-horizontal",
            title: "6층: 침식의 극점",
            name: "침식의 극점",
            spinnerClass: "spinner-6",
            orbitClass: "orbit-floor-6",
            sparkleClass: "sparkle-purple",
            category: "TOWER OF MOON'S SHADOW · 6F",
            badge: "FLOOR 06",
            phaseSymbol: "하현 (Last Quarter)",
            imgClass: "floor-img-6",
            description: "인간계의 오염과 탑의 왜곡된 마력이 융합되어 천사의 영핵(신성 코어)을 한계까지 쥐어짜는 지옥 같은 층입니다. 칼리스테의 날개는 석화에 가깝게 굳어가고, 시노페의 신체 침식은 전신으로 번져가며 모두가 한계에 다다릅니다.",
            stats: [
                { icon: "fa-solid fa-biohazard", label: "위험 요소: 신성 영핵 급속 붕괴 & 석화" },
                { icon: "fa-solid fa-ghost", label: "주요 조우: 극점의 침식 괴수" }
            ],
            characters: [
                { char: "sinope", name: "시노페 (침식 억제 유격전)" },
                { char: "calliste", name: "칼리스테 (체념을 딛는 기도)" }
            ]
        },
        {
            floor: 5,
            roman: "V",
            phase: "만월",
            phaseEn: "Full Moon",
            icon: "fa-solid fa-circle",
            title: "5층: 광휘 성당",
            name: "광휘 성당",
            spinnerClass: "spinner-5",
            orbitClass: "orbit-floor-5",
            sparkleClass: "sparkle-gold",
            category: "TOWER OF MOON'S SHADOW · 5F",
            badge: "FLOOR 05",
            phaseSymbol: "만월 (Full Moon)",
            imgClass: "floor-img-5",
            description: "만월의 순백 성광이 눈이 멀도록 쏟아져 내리는 거대한 대성당 구역입니다. 하지만 그 찬란한 빛 속에는 신의 자비가 아닌 잔인한 침묵만이 깃들어 있습니다.",
            stats: [
                { icon: "fa-solid fa-sun", label: "위험 요소: 실명 유발 성광 & 자동 방어 성물" },
                { icon: "fa-solid fa-monument", label: "주요 조우: 성당의 백은 수호기사" }
            ],
            characters: [
                { char: "helio", name: "헬리오 (대검 결계 방어)" },
                { char: "nebbia", name: "네비아 (성물 핵심 파괴)" }
            ]
        },
        {
            floor: 4,
            roman: "IV",
            phase: "반월",
            phaseEn: "Gibbous Moon",
            icon: "fa-solid fa-adjust",
            title: "4층: 거울 회랑",
            name: "거울 회랑",
            spinnerClass: "spinner-4",
            orbitClass: "orbit-floor-4",
            sparkleClass: "sparkle-cyan",
            category: "TOWER OF MOON'S SHADOW · 4F",
            badge: "FLOOR 04",
            phaseSymbol: "반월 (Gibbous Moon)",
            imgClass: "floor-img-4",
            description: "수만 개의 차가운 은빛 거울로 둘러싸인 미로 회랑입니다. 거울 속에는 천사들이 지상에서 겪은 수치, 상위 천사에게 버림받았던 상처, 신체에 진행 중인 인계 침식의 모습이 투영됩니다.",
            stats: [
                { icon: "fa-solid fa-clone", label: "위험 요소: 죄책감의 도플갱어" },
                { icon: "fa-solid fa-gem", label: "주요 조우: 거울의 복제자" }
            ],
            characters: [
                { char: "sinope", name: "시노페 (쌍단검 거울 파괴)" },
                { char: "calliste", name: "칼리스테 (진실의 직시)" }
            ]
        },
        {
            floor: 3,
            roman: "III",
            phase: "상현",
            phaseEn: "First Quarter",
            icon: "fa-solid fa-moon",
            title: "3층: 이성의 균열",
            name: "이성의 균열",
            spinnerClass: "spinner-3",
            orbitClass: "orbit-floor-3",
            sparkleClass: "sparkle-amber",
            category: "TOWER OF MOON'S SHADOW · 3F",
            badge: "FLOOR 03",
            phaseSymbol: "상현 (First Quarter)",
            imgClass: "floor-img-3",
            description: "탑의 중층부로 접어들며 신의 침묵에 대한 분노와 동료에 대한 불신이 극대화되는 층입니다. 공간 자체가 기하학적으로 찢겨 있으며, 영혼의 파장을 증폭시키는 균열이 이성을 갉아먹습니다.",
            stats: [
                { icon: "fa-solid fa-brain", label: "위험 요소: 광기 유발 파동 & 불신 증폭" },
                { icon: "fa-solid fa-bolt", label: "주요 조우: 균열의 사념체" }
            ],
            characters: [
                { char: "nebbia", name: "네비아 (분노의 레이피어)" },
                { char: "helio", name: "헬리오 (냉정한 현실 직시)" }
            ]
        },
        {
            floor: 2,
            roman: "II",
            phase: "초승",
            phaseEn: "Crescent",
            icon: "fa-solid fa-moon",
            title: "2층: 갈망의 안개",
            name: "갈망의 안개",
            spinnerClass: "spinner-2",
            orbitClass: "orbit-floor-2",
            sparkleClass: "sparkle-blue",
            category: "TOWER OF MOON'S SHADOW · 2F",
            badge: "FLOOR 02",
            phaseSymbol: "초승 (Waxing Crescent)",
            imgClass: "floor-img-2",
            description: "돌아가지 못한 천사들의 애끓는 염원이 보랏빛 환각의 안개로 응결된 층입니다. 안개 속에서는 이미 닫혀버린 월구 너머의 그리운 천계 풍경과 신의 따스한 목소리가 환청으로 울려 퍼집니다.",
            stats: [
                { icon: "fa-solid fa-eye-slash", label: "위험 요소: 천계 환각 & 청각 교란" },
                { icon: "fa-solid fa-wind", label: "주요 조우: 갈망의 환영체" }
            ],
            characters: [
                { char: "calliste", name: "칼리스테 (기록 및 환각 식별)" },
                { char: "sinope", name: "시노페 (유격 미끼 기동)" }
            ]
        },
        {
            floor: 1,
            roman: "I",
            phase: "삭",
            phaseEn: "New Moon",
            icon: "fa-regular fa-circle",
            title: "1층: 망각의 진흙 늪",
            name: "망각의 진흙 늪",
            spinnerClass: "spinner-1",
            orbitClass: "orbit-floor-1",
            sparkleClass: "sparkle-dark",
            category: "TOWER OF MOON'S SHADOW · 1F",
            badge: "FLOOR 01",
            phaseSymbol: "삭 (New Moon)",
            imgClass: "floor-img-1",
            description: "인간계 전장에서 탑의 기저부로 이어지는 최하층입니다. 신성을 갉아먹는 검은 진흙과 탁한 수맥이 얽혀 있으며, 발을 딛는 순간 과거의 영광스러운 천계 기억을 잃어버리는 '망각의 침식'이 시작됩니다.",
            stats: [
                { icon: "fa-solid fa-skull", label: "위험 요소: 망각의 진흙 & 날개 오염" },
                { icon: "fa-solid fa-shield-halved", label: "주요 조우: 침식된 수호령 & 이형의 악마" }
            ],
            characters: [
                { char: "helio", name: "헬리오 (선봉 돌파)" },
                { char: "nebbia", name: "네비아 (진흙 악마 절단)" }
            ]
        }
    ];

    async function loadAndRenderFloors() {
        try {
            const res = await fetch('data/floors.json');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            floorsList = await res.json();
        } catch (err) {
            console.warn("Could not load data/floors.json, using fallback floors:", err);
            floorsList = defaultFloors;
        }
        renderFloorsAndOrbits(floorsList);
    }

    function renderFloorsAndOrbits(floors) {
        if (!orbitsContainer || !detailCardsContainer) return;

        // 1. Render Orbits
        orbitsContainer.innerHTML = floors.map(f => `
            <div class="orbit-line-wrapper ${f.orbitClass || 'orbit-floor-' + f.floor}" data-layer="${f.floor}">
                <div class="orbit-line"></div>
                <div class="orbit-spinner">
                    <div class="orbit-rotator ${f.spinnerClass || 'spinner-' + f.floor}">
                        <div class="orbit-sparkle ${f.sparkleClass || ''}"></div>
                    </div>
                </div>
                <div class="orbit-content">
                    <span class="orbit-number"><i class="${f.icon || 'fa-solid fa-moon'}"></i> ${f.roman} · ${f.phase} (${f.phaseEn})</span>
                    <h3 class="orbit-title">${f.title || `${f.floor}층: ${f.name}`}</h3>
                </div>
            </div>
        `).join('');

        // 2. Render Detail Cards
        detailCardsContainer.innerHTML = floors.map(f => `
            <div class="detail-card ${f.isBossCard ? 'special-boss-card' : ''}" id="detail-${f.floor}">
                <div class="card-image ${f.imgClass || 'floor-img-' + f.floor}">
                    <div class="floor-badge ${f.isBossCard ? 'boss-badge' : ''}">${f.badge || `FLOOR 0${f.floor}`}</div>
                    <div class="phase-symbol ${f.isBossCard ? 'eclipse-symbol' : ''}"><i class="${f.icon || 'fa-solid fa-moon'}"></i> ${f.phaseSymbol || f.phase}</div>
                </div>
                <div class="card-info">
                    <span class="card-category ${f.isBossCard ? 'boss-category' : ''}">${f.category || `TOWER OF MOON'S SHADOW · ${f.floor}F`}</span>
                    <h2 class="${f.isBossCard ? 'boss-title' : ''}">${f.name}</h2>
                    <div class="card-divider ${f.isBossCard ? 'boss-divider' : ''}"></div>
                    <p class="card-text">${f.description || ''}</p>
                    ${f.stats && f.stats.length > 0 ? `
                        <div class="floor-stats">
                            ${f.stats.map(s => `<div class="stat-pill"><i class="${s.icon}"></i> ${s.label}</div>`).join('')}
                        </div>
                    ` : ''}
                    ${f.characters && f.characters.length > 0 ? `
                        <div class="characters-preview">
                            <h4>${f.isBossCard ? '최후의 총력전' : '층내 주요 대응 천사'}</h4>
                            <div class="char-list">
                                ${f.characters.map(ch => `
                                    <div class="char-item" data-char="${ch.char}">
                                        <span class="char-avatar char-${ch.char}"></span>
                                        <span class="char-name">${ch.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

        // 3. Attach Orbit Click Handlers
        const orbitWrappers = orbitsContainer.querySelectorAll(".orbit-line-wrapper");
        orbitWrappers.forEach(wrapper => {
            wrapper.addEventListener("click", () => {
                const layerNum = wrapper.getAttribute("data-layer");
                openDetailView(layerNum);
            });
        });

        // 4. Attach Quick Character Jump from Floor Detail cards
        detailCardsContainer.querySelectorAll(".char-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                const charKey = item.getAttribute("data-char");
                if (charKey) {
                    const targetCharId = `char-${charKey}`;
                    selectCharacterTab(targetCharId);
                    closeDetailView();
                    setTimeout(() => {
                        openCustomModal(charactersModal);
                    }, 350);
                }
            });
        });
    }

    // Initialize floors loading
    loadAndRenderFloors();

    // Transition into Layer Detail card Overlay
    function openDetailView(layerNum) {
        // Close any other open modals first
        closeCustomModal(worldviewModal);
        closeCustomModal(charactersModal);

        const exitTimeline = anime.timeline({
            easing: 'easeOutExpo',
            duration: 800
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
                delay: anime.stagger(40)
            }, 0)
            .add({
                targets: '#detail-container',
                opacity: [0, 1],
                begin: () => {
                    detailContainer.classList.remove("hidden");
                    document.querySelectorAll(".detail-card").forEach(card => card.classList.remove("active"));
                    const targetCard = document.getElementById(`detail-${layerNum}`);
                    if (targetCard) targetCard.classList.add("active");
                }
            }, 250)
            .add({
                targets: `#detail-${layerNum}`,
                translateY: [80, 0],
                opacity: [0, 1],
                duration: 900,
                easing: 'easeOutQuint'
            }, 350)
            .add({
                targets: '.close-btn',
                opacity: [0, 1],
                translateY: [-15, 0],
                duration: 400
            }, 450);
    }

    // Close Floor Detail Overlay
    function closeDetailView() {
        const activeCard = document.querySelector(".detail-card.active");
        
        const returnTimeline = anime.timeline({
            easing: 'easeOutExpo',
            duration: 750
        });

        if (activeCard) {
            returnTimeline.add({
                targets: activeCard,
                translateY: 80,
                opacity: 0,
                duration: 500
            }, 0);
        }

        returnTimeline
            .add({
                targets: '.close-btn',
                opacity: 0,
                duration: 300
            }, 0)
            .add({
                targets: '#detail-container',
                opacity: 0,
                complete: () => {
                    detailContainer.classList.add("hidden");
                    if (activeCard) activeCard.classList.remove("active");
                }
            }, 150)
            .add({
                targets: '.moon-wrapper',
                translateY: 0,
                opacity: 1
            }, 300)
            .add({
                targets: '.earth-wrapper',
                translateY: 0,
                opacity: 1
            }, 300)
            .add({
                targets: '.orbit-line-wrapper',
                opacity: 1,
                scale: 1,
                delay: anime.stagger(40)
            }, 300);
    }

    closeBtn.addEventListener("click", closeDetailView);

    // Click outside detail card to close
    detailContainer.addEventListener("click", (e) => {
        if (e.target === detailContainer) {
            closeDetailView();
        }
    });

    // Helper functions for Custom Modals (Worldview, Characters)
    function openCustomModal(modalElement) {
        modalElement.classList.remove("hidden");
        anime({
            targets: modalElement,
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutQuad'
        });
        const box = modalElement.querySelector(".modal-box");
        if (box) {
            anime({
                targets: box,
                scale: [0.92, 1],
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutQuint'
            });
        }
    }

    function closeCustomModal(modalElement) {
        if (!modalElement || modalElement.classList.contains("hidden")) return;
        const box = modalElement.querySelector(".modal-box");
        if (box) {
            anime({
                targets: box,
                scale: 0.94,
                translateY: 20,
                opacity: 0,
                duration: 300,
                easing: 'easeInQuad'
            });
        }
        anime({
            targets: modalElement,
            opacity: 0,
            duration: 350,
            easing: 'easeInQuad',
            complete: () => {
                modalElement.classList.add("hidden");
            }
        });
    }

    // Worldview Modal
    if (btnOpenWorldview) {
        btnOpenWorldview.addEventListener("click", () => openCustomModal(worldviewModal));
    }
    if (btnCloseWorldview) {
        btnCloseWorldview.addEventListener("click", () => closeCustomModal(worldviewModal));
    }
    if (worldviewModal) {
        worldviewModal.addEventListener("click", (e) => {
            if (e.target === worldviewModal) closeCustomModal(worldviewModal);
        });
    }

    // ----------------------------------------------------
    // 7. Dynamic Characters Data Loader (from data/characters.json)
    // ----------------------------------------------------
    let characterList = [];

    // Fallback data for robust offline / local preview support
    const defaultCharacters = [
        {
            id: "nebbia",
            name: "네비아",
            enName: "Nebbia",
            rankBadge: "제9품계 하급 천사 · 전사",
            meta: "여성 / 전사 / 제9품계",
            weapon: { icon: "fa-solid fa-wand-magic-sparkles", text: "은빛 레이피어" },
            tags: ["#까칠한츤데레", "#신의침묵에분노", "#속정깊음", "#잿빛날개"],
            appearance: "헝클어진 금발 단발, 날카롭고 강렬한 녹안(Emerald Eyes). 지상 전장의 흙먼지가 묻은 은빛 경갑주를 걸쳤으며, 인계 침식으로 인해 본래 순백이던 날개가 잿빛으로 흐려져 있습니다.",
            personality: "까칠하고 틱틱대는 츤데레 전사. 신의 침묵을 명백한 배신으로 여겨 분노를 감추지 않습니다. 그러나 동료를 누구보다 아끼며, 툭툭 내뱉는 날 선 반말 뒤로 혀를 차거나 시선을 피하며 챙겨줍니다.",
            quote: "착각하지 마. 널 구한 게 아니라 저놈 모가지를 벤 것뿐이니까. 따라올 거면 발소리나 죽여.",
            visualClass: "char-visual-nebbia",
            tabAvatarClass: "tab-nebbia"
        },
        {
            id: "calliste",
            name: "칼리스테",
            enName: "Calliste",
            rankBadge: "제9품계 하급 천사 · 관조·기록",
            meta: "여성 / 관조·기록 / 제9품계",
            weapon: { icon: "fa-solid fa-scroll", text: "낡은 면사포 & 경화된 날개" },
            tags: ["#소심하고조용함", "#체념적성향", "#비행불가", "#서글픈존댓말"],
            appearance: "풍성하게 구불거리는 긴 은발, 항상 눈물이 고인 듯 맑고 투명한 벽안(Cyan Eyes). 머리에는 올이 풀린 낡은 면사포를 둘렀으며, 한쪽 날개가 완전히 석화처럼 경화되어 더 이상 하늘을 날 수 없습니다.",
            personality: "소심하고 조용하며, 버려진 처지를 서글프게 직시하는 체념적 성향. 말끝을 흐리는 나지막하고 가녀린 존댓말을 쓰며, 불안할 때면 낡은 옷소매를 꼭 쥐는 버릇이 있습니다.",
            quote: "돌아갈 수 있을까요……? 우린 버려진 거예요. 그러니…… 너무 애쓰지 마세요.",
            visualClass: "char-visual-calliste",
            tabAvatarClass: "tab-calliste"
        },
        {
            id: "helio",
            name: "헬리오",
            enName: "Helio",
            rankBadge: "제9품계 하급 천사 · 전사·선봉",
            meta: "남성 / 전사·선봉 / 제9품계",
            weapon: { icon: "fa-solid fa-gavel", text: "묵직한 대검" },
            tags: ["#철저한현실주의", "#감정절제", "#과거배신경험", "#듬직한탱커"],
            appearance: "차분하게 정돈된 회색 머리, 건조하고 단호한 회안(Grey Eyes). 단련된 다부진 체격 위에 낡은 검은 가죽 코트를 걸치고 있으며, 거대한 양손 대검을 덤덤하게 짊어지고 있습니다.",
            personality: "철저한 현실주의자이자 감정에 휘둘리지 않는 든든한 선봉장. 과거 상위 천사에게 희생양으로 버림받았던 기억이 있습니다. 단정하고 건조한 존댓말/반존대를 구사하며 철저히 팩트만을 전달합니다.",
            quote: "신이 우릴 버렸다는 걸 인정하면 편해집니다. 멍청하게 서 있지 말고 내 뒤로 붙으세요.",
            visualClass: "char-visual-helio",
            tabAvatarClass: "tab-helio"
        },
        {
            id: "sinope",
            name: "시노페",
            enName: "Sinope",
            rankBadge: "제9품계 하급 천사 · 전사·유격",
            meta: "남성 / 전사·유격 / 제9품계",
            weapon: { icon: "fa-solid fa-khanda", text: "흑은의 쌍단검" },
            tags: ["#능글맞은장난꾼", "#희생을숨김", "#신체침식진행", "#유쾌한반말"],
            appearance: "느슨하게 반묶음한 은발, 장난기 가득한 붉은 적안(Ruby Eyes). 헐렁한 제복 셔츠를 입고 있으며, 과거 지상에서 동료들을 보호하려다 인계 침식이 신체 일부로 번져 검게 물들어 있습니다.",
            personality: "항상 싱글벙글 웃는 유쾌한 트릭스터. 자신의 고통과 침식의 상처를 농담 뒤로 철저히 숨깁니다. 나른하고 리듬감 있는 가벼운 반말을 쓰며 언제든 동료를 위해 미끼가 될 각오를 품고 있습니다.",
            quote: "대충 해, 대충. 어차피 죽기밖에 더하겠어? 정 안 되면 내가 미끼가 돼 줄 테니까 넌 뛰어.",
            visualClass: "char-visual-sinope",
            tabAvatarClass: "tab-sinope"
        }
    ];

    async function loadAndRenderCharacters() {
        try {
            const res = await fetch('data/characters.json');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            characterList = await res.json();
        } catch (err) {
            console.warn("Could not load data/characters.json, using fallback character list:", err);
            characterList = defaultCharacters;
        }
        renderCharacterDossier(characterList);
    }

    function renderCharacterDossier(characters) {
        if (!charTabsContainer || !charPanesContainer) return;

        charTabsContainer.innerHTML = characters.map((c, i) => `
            <button class="tab-btn ${i === 0 ? 'active' : ''}" data-target="char-${c.id}">
                <span class="tab-avatar ${c.tabAvatarClass || 'tab-' + c.id}"></span>
                <span class="tab-name">${c.name}</span>
            </button>
        `).join('');

        charPanesContainer.innerHTML = characters.map((c, i) => `
            <div class="char-pane ${i === 0 ? 'active' : ''}" id="char-${c.id}">
                <div class="pane-grid">
                    <div class="pane-visual ${c.visualClass || 'char-visual-' + c.id}">
                        <div class="char-rank-badge">${c.rankBadge || c.rank || '제9품계 하급 천사'}</div>
                        <div class="char-weapon-badge"><i class="${c.weapon?.icon || 'fa-solid fa-feather'}"></i> ${c.weapon?.text || ''}</div>
                    </div>
                    <div class="pane-details">
                        <div class="ch-name-row">
                            <h3>${c.name} <span class="ch-en">${c.enName || ''}</span></h3>
                            <span class="ch-meta">${c.meta || ''}</span>
                        </div>
                        <div class="ch-tags">
                            ${(c.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
                        </div>

                        <div class="ch-section">
                            <h4><i class="fa-solid fa-user"></i> 외모 및 신체 특징</h4>
                            <p>${c.appearance || ''}</p>
                        </div>

                        <div class="ch-section">
                            <h4><i class="fa-solid fa-comment-dots"></i> 성격 및 말투</h4>
                            <p>${c.personality || ''}</p>
                        </div>

                        <div class="ch-quote-box">
                            <div class="quote-tag"><i class="fa-solid fa-quote-left"></i> 대표 대사</div>
                            <p class="quote-text">"${c.quote || ''}"</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Attach click listeners to dynamically created tab buttons
        const tabs = charTabsContainer.querySelectorAll(".tab-btn");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const targetId = tab.getAttribute("data-target");
                selectCharacterTab(targetId);
            });
        });
    }

    function selectCharacterTab(charId) {
        const tabs = document.querySelectorAll(".char-tabs .tab-btn");
        const panes = document.querySelectorAll(".char-panes .char-pane");

        tabs.forEach(tab => {
            if (tab.getAttribute("data-target") === charId) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });

        panes.forEach(pane => {
            if (pane.id === charId) {
                pane.classList.add("active");
            } else {
                pane.classList.remove("active");
            }
        });
    }

    // Initialize character loading
    loadAndRenderCharacters();

    if (btnOpenCharacters) {
        btnOpenCharacters.addEventListener("click", () => {
            selectCharacterTab("char-nebbia");
            openCustomModal(charactersModal);
        });
    }

    if (btnCloseCharacters) {
        btnCloseCharacters.addEventListener("click", () => closeCustomModal(charactersModal));
    }

    if (charactersModal) {
        charactersModal.addEventListener("click", (e) => {
            if (e.target === charactersModal) closeCustomModal(charactersModal);
        });
    }

    // ----------------------------------------------------
    // 9. Background Music (BGM) Player Controller
    // ----------------------------------------------------
    const bgmAudio = document.getElementById("bgm-audio");
    const bgmToggleBtn = document.getElementById("bgm-toggle-btn");
    const bgmIcon = document.getElementById("bgm-icon");
    const bgmPlayer = document.getElementById("bgm-player");
    const bgmVolume = document.getElementById("bgm-volume");
    const volumeIcon = document.getElementById("volume-icon");

    let isAudioPlaying = false;
    let lastVolume = 0.5;

    if (bgmAudio) {
        bgmAudio.volume = 0.5;

        // Auto start helper
        window.tryStartBgm = function() {
            if (!isAudioPlaying) {
                bgmAudio.play().then(() => {
                    isAudioPlaying = true;
                    updateBgmUI(true);
                }).catch(err => {
                    console.log("Audio autoplay prevented by browser policy:", err);
                });
            }
        };

        function toggleBgm() {
            if (bgmAudio.paused) {
                bgmAudio.play().then(() => {
                    isAudioPlaying = true;
                    updateBgmUI(true);
                }).catch(err => {
                    console.warn("Could not play audio:", err);
                });
            } else {
                bgmAudio.pause();
                isAudioPlaying = false;
                updateBgmUI(false);
            }
        }

        function updateBgmUI(playing) {
            if (playing) {
                bgmPlayer.classList.add("bgm-playing");
                bgmIcon.className = "fa-solid fa-pause";
                bgmToggleBtn.setAttribute("title", "음악 일시정지");
            } else {
                bgmPlayer.classList.remove("bgm-playing");
                bgmIcon.className = "fa-solid fa-play";
                bgmToggleBtn.setAttribute("title", "음악 재생");
            }
        }

        if (bgmToggleBtn) {
            bgmToggleBtn.addEventListener("click", toggleBgm);
        }

        if (bgmVolume) {
            bgmVolume.addEventListener("input", (e) => {
                const vol = parseFloat(e.target.value);
                bgmAudio.volume = vol;
                if (vol > 0) lastVolume = vol;
                updateVolumeIcon(vol);
            });
        }

        if (volumeIcon) {
            volumeIcon.addEventListener("click", () => {
                if (bgmAudio.volume > 0) {
                    lastVolume = bgmAudio.volume;
                    bgmAudio.volume = 0;
                    if (bgmVolume) bgmVolume.value = 0;
                    updateVolumeIcon(0);
                } else {
                    const restoredVol = lastVolume > 0 ? lastVolume : 0.5;
                    bgmAudio.volume = restoredVol;
                    if (bgmVolume) bgmVolume.value = restoredVol;
                    updateVolumeIcon(restoredVol);
                }
            });
        }

        function updateVolumeIcon(vol) {
            if (!volumeIcon) return;
            if (vol === 0) {
                volumeIcon.className = "fa-solid fa-volume-xmark volume-icon";
            } else if (vol < 0.5) {
                volumeIcon.className = "fa-solid fa-volume-low volume-icon";
            } else {
                volumeIcon.className = "fa-solid fa-volume-high volume-icon";
            }
        }

        bgmAudio.addEventListener("play", () => updateBgmUI(true));
        bgmAudio.addEventListener("pause", () => updateBgmUI(false));
    } else {
        window.tryStartBgm = function() {};
    }

    // Keyboard Escape Key to close any active modal/detail
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (!detailContainer.classList.contains("hidden")) {
                closeDetailView();
            }
            if (!worldviewModal.classList.contains("hidden")) {
                closeCustomModal(worldviewModal);
            }
            if (!charactersModal.classList.contains("hidden")) {
                closeCustomModal(charactersModal);
            }
        }
    });
});
