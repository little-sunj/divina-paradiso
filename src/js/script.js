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

        // Earth Lights (Deep Dark Fantasy Tone)
        const earthAmbient = new THREE.AmbientLight(0x18181c, 0.2); // Faint dark ambient
        earthScene.add(earthAmbient);

        const earthDirectional = new THREE.DirectionalLight(0x777788, 0.45); // Subtle silver rim light
        earthDirectional.position.set(2, 5, 4);
        earthScene.add(earthDirectional);

        // Earth material setup - deep black / obsidian surface
        const earthMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x0c0c10),
            roughness: 0.85,
            metalness: 0.15,
            transparent: true,
            opacity: 0.92
        });

        if (isLocalFile) {
            // Apply offline procedural dark texture
            earthMaterial.map = createEarthTexture();
            earthMaterial.needsUpdate = true;
        } else {
            // Darkened texture map
            setupPlanetTexture("img-earth-night", earthMaterial, createEarthTexture);
            
            // Subdued dark emissive
            earthMaterial.emissive = new THREE.Color(0x1a1a20);
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
        const isShortScreen = window.innerHeight <= 700;

        const moonSize = isMobile ? (isShortScreen ? 110 : 125) : 220;
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

    // Helper to render Google Material Symbols (or legacy FontAwesome) icon
    function renderIcon(iconName, defaultName = '', extraClasses = '') {
        const icon = iconName || defaultName;
        if (!icon) return '';
        if (icon.startsWith('fa-') || icon.includes('fa-')) {
            return `<i class="${icon} ${extraClasses}"></i>`;
        }
        return `<span class="material-symbols-outlined ${extraClasses}">${icon}</span>`;
    }

    // ----------------------------------------------------
    // 6. Dynamic Floors Data Loader (from data/floors.json)
    // ----------------------------------------------------
    const orbitsContainer = document.getElementById("orbits-container");
    const detailCardsContainer = document.getElementById("detail-cards-container");
    const worldviewModal = document.getElementById("worldview-modal");
    const charactersModal = document.getElementById("characters-modal");
    const authorNotesModal = document.getElementById("author-notes-modal");
    const btnOpenWorldview = document.getElementById("btn-open-worldview");
    const btnCloseWorldview = document.getElementById("btn-close-worldview");
    const btnOpenCharacters = document.getElementById("btn-open-characters");
    const btnCloseCharacters = document.getElementById("btn-close-characters");
    const btnOpenAuthorNotes = document.getElementById("btn-open-author-notes");
    const btnCloseAuthorNotes = document.getElementById("btn-close-author-notes");
    const worldviewTabsContainer = document.getElementById("worldview-tabs-container");
    const worldviewPanesContainer = document.getElementById("worldview-panes-container");
    const charTabsContainer = document.getElementById("char-tabs-container");
    const charPanesContainer = document.getElementById("char-panes-container");
    const authorNotesTabsContainer = document.getElementById("author-notes-tabs-container");
    const authorNotesPanesContainer = document.getElementById("author-notes-panes-container");

    let floorsList = [];

    const defaultFloors = [
        {
            floor: 7,
            roman: "VII",
            phase: "월식",
            phaseEn: "Eclipse",
            icon: "radio_button_unchecked",
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
                { char: "hellio", name: "헬리오" },
                { char: "sinope", name: "시노페" },
                { char: "calliste", name: "칼리스테" }
            ]
        },
        {
            floor: 6,
            roman: "VI",
            phase: "하현",
            phaseEn: "Last Quarter",
            icon: "brightness_2",
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
                { icon: "warning", label: "위험 요소: 신성 영핵 급속 붕괴 & 석화" },
                { icon: "sentiment_very_dissatisfied", label: "주요 조우: 극점의 침식 괴수" }
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
            icon: "circle",
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
                { icon: "light_mode", label: "위험 요소: 실명 유발 성광 & 자동 방어 성물" },
                { icon: "shield", label: "주요 조우: 성당의 백은 수호기사" }
            ],
            characters: [
                { char: "hellio", name: "헬리오 (대검 결계 방어)" },
                { char: "nebbia", name: "네비아 (성물 핵심 파괴)" }
            ]
        },
        {
            floor: 4,
            roman: "IV",
            phase: "반월",
            phaseEn: "Gibbous Moon",
            icon: "contrast",
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
                { icon: "copy_all", label: "위험 요소: 죄책감의 도플갱어" },
                { icon: "diamond", label: "주요 조우: 거울의 복제자" }
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
            icon: "dark_mode",
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
                { icon: "psychology", label: "위험 요소: 광기 유발 파동 & 불신 증폭" },
                { icon: "bolt", label: "주요 조우: 균열의 사념체" }
            ],
            characters: [
                { char: "nebbia", name: "네비아 (분노의 레이피어)" },
                { char: "hellio", name: "헬리오 (냉정한 현실 직시)" }
            ]
        },
        {
            floor: 2,
            roman: "II",
            phase: "초승",
            phaseEn: "Crescent",
            icon: "dark_mode",
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
                { icon: "visibility_off", label: "위험 요소: 천계 환각 & 청각 교란" },
                { icon: "air", label: "주요 조우: 갈망의 환영체" }
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
            icon: "circle",
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
                { icon: "skull", label: "위험 요소: 망각의 진흙 & 날개 오염" },
                { icon: "shield", label: "주요 조우: 침식된 수호령 & 이형의 악마" }
            ],
            characters: [
                { char: "hellio", name: "헬리오 (선봉 돌파)" },
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
                    <span class="orbit-number">${renderIcon(f.icon, 'dark_mode')} ${f.roman}층 · ${f.phase}</span>
                </div>
            </div>
        `).join('');

        // 2. Render Detail Cards
        detailCardsContainer.innerHTML = floors.map(f => `
            <div class="detail-card ${f.isBossCard ? 'special-boss-card' : ''}" id="detail-${f.floor}">
                <div class="card-image ${f.imgClass || 'floor-img-' + f.floor}">
                    <div class="floor-badge ${f.isBossCard ? 'boss-badge' : ''}">${f.badge || `FLOOR 0${f.floor}`}</div>
                </div>
                <div class="card-info">
                    <div class="card-body-text">
                        <span class="card-category ${f.isBossCard ? 'boss-category' : ''}">${f.category || `TOWER OF MOON'S SHADOW · ${f.floor}F`}</span>
                        <h2 class="${f.isBossCard ? 'boss-title' : ''}">${f.name}</h2>
                        <div class="card-divider ${f.isBossCard ? 'boss-divider' : ''}"></div>
                        <p class="card-text">${f.description || ''}</p>
                    </div>
                    <div class="phase-symbol ${f.isBossCard ? 'eclipse-symbol' : ''}">${renderIcon(f.icon, 'dark_mode')} ${f.phaseSymbol || f.phase}</div>
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
                targets: '.center-axis-line',
                opacity: 0,
                duration: 500
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
            }, 300)
            .add({
                targets: '.center-axis-line',
                opacity: 1,
                duration: 600
            }, 300);
    }

    if (closeBtn) closeBtn.addEventListener("click", closeDetailView);

    if (detailContainer) {
        detailContainer.addEventListener("click", (e) => {
            if (e.target === detailContainer) {
                closeDetailView();
            }
        });
    }

    // Helper functions for Custom Modals (Worldview, Characters, Author Notes)
    function openCustomModal(modalElement) {
        if (!modalElement) return;
        modalElement.classList.remove("hidden");
        const isFullscreen = modalElement.classList.contains("fullscreen-modal");

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
                scale: isFullscreen ? [1, 1] : [0.92, 1],
                translateY: isFullscreen ? [20, 0] : [30, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutQuint'
            });
        }
    }

    function closeCustomModal(modalElement) {
        if (!modalElement || modalElement.classList.contains("hidden")) return;
        const isFullscreen = modalElement.classList.contains("fullscreen-modal");
        const box = modalElement.querySelector(".modal-box");
        if (box) {
            anime({
                targets: box,
                scale: isFullscreen ? 1 : 0.94,
                translateY: isFullscreen ? 15 : 20,
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

    // ----------------------------------------------------
    // Unified Tab / Slider Controller Engine
    // ----------------------------------------------------
    function setupTabSlider(tabsContainer, panesContainer, onTabChange) {
        if (!tabsContainer || !panesContainer) return null;

        let currentIndex = 0;

        function getTabs() {
            return tabsContainer.querySelectorAll(".tab-slider-btn, .tab-btn");
        }

        function getPanes() {
            return panesContainer.querySelectorAll(".tab-slider-pane, .char-pane");
        }

        function goTo(index) {
            const tabs = getTabs();
            const panes = getPanes();
            if (!tabs.length || !panes.length) return;

            if (index < 0) index = 0;
            if (index >= tabs.length) index = tabs.length - 1;
            currentIndex = index;

            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add("active");
                    tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    tab.classList.remove("active");
                }
            });

            panes.forEach((pane, i) => {
                if (i === index) {
                    pane.classList.add("active");
                    panesContainer.scrollTop = 0;
                } else {
                    pane.classList.remove("active");
                }
            });

            panes.forEach((pane) => {
                const prev = pane.querySelector(".btn-slide-prev");
                const next = pane.querySelector(".btn-slide-next");
                if (prev) prev.disabled = (index === 0);
                if (next) next.disabled = (index === tabs.length - 1);
            });

            if (typeof onTabChange === 'function') {
                onTabChange(index);
            }
        }

        function bindEvents() {
            const tabs = getTabs();
            tabs.forEach((tab, i) => {
                tab.addEventListener("click", () => goTo(i));
            });

            const panes = getPanes();
            panes.forEach((pane) => {
                const prev = pane.querySelector(".btn-slide-prev");
                const next = pane.querySelector(".btn-slide-next");
                if (prev) prev.addEventListener("click", () => goTo(currentIndex - 1));
                if (next) next.addEventListener("click", () => goTo(currentIndex + 1));
            });
        }

        bindEvents();

        return {
            goTo,
            next: () => goTo(currentIndex + 1),
            prev: () => goTo(currentIndex - 1),
            getIndex: () => currentIndex
        };
    }

    let worldviewSlider = null;
    let charactersSlider = null;
    let authorNotesSlider = null;

    // Helper for Slide Navigation Footer
    function createSlideNavBarHtml(currentIndex, totalCount) {
        const prevDisabled = currentIndex === 0 ? 'disabled' : '';
        const nextDisabled = currentIndex === totalCount - 1 ? 'disabled' : '';

        return `
            <div class="slide-nav-bar">
                <button class="slide-nav-btn btn-slide-prev" ${prevDisabled} title="이전" aria-label="이전">
                    <span class="material-symbols-outlined">arrow_back</span>
                </button>
                <button class="slide-nav-btn btn-slide-next" ${nextDisabled} title="다음" aria-label="다음">
                    <span class="material-symbols-outlined">arrow_forward</span>
                </button>
            </div>
        `;
    }

    // ----------------------------------------------------
    // 7. Worldview & Prologue (from data/worldview.json)
    // ----------------------------------------------------
    const defaultWorldview = {
        header: { tag: "DIVINA LUNA LORE", title: "세계관" },
        chapters: [
            {
                id: "prologue",
                tabName: "프롤로그",
                tabIcon: "auto_stories",
                tag: "PROLOGUE · THE SILENCE OF HEAVEN",
                title: "닫혀버린 하늘, 지상에 고립된 낙천사들의 순례",
                paragraphs: [
                    "천사들과 악마들의 오랜 전쟁 속에서 천계 최하층 '월구(달)'의 문이 안쪽에서 일방적으로 봉쇄되었습니다.",
                    "미처 천상으로 귀환하지 못한 채 인간계 전장에 남겨진 제9품계 하급 천사들은 점차 지상의 탁기에 노출되어 '인계 침식'의 고통에 젖어갑니다. 순백이던 날개는 잿빛으로 굳어가고, 성스러운 광륜은 빛을 잃어갑니다.",
                    "신은 침묵하고 구원의 손길은 사라진 절망의 대지. 서로 다른 상처와 고뇌를 품은 4인의 천사가 하늘로 돌아갈 유일한 길은, 지상에서 월구로 이어지는 거대한 에테르 나선 '달의 그림자 탑'을 오르는 것뿐입니다."
                ],
                tags: ["#대봉쇄", "#신의침묵", "#제9품계", "#인계침식", "#달의그림자탑"],
                quote: "하늘이 우리를 버렸을지라도, 우리가 서로를 놓지 않는 한 이곳은 지옥이 아닙니다."
            },
            {
                id: "dante",
                tabName: "단테 《신곡》 모티프",
                tabIcon: "menu_book",
                tag: "LITERARY MOTIF · PRIMO CIELO",
                title: "불완전한 영혼들이 머무는 제1천 '월구(Sphere of the Moon)'",
                paragraphs: [
                    "단테 알리기에리의 《신곡》 천국편에서 가장 낮은 하늘인 '월구(Primo Cielo)'는 외압에 의해 서원을 온전히 지키지 못했던 불완전한 영혼들이 배치되는 곳입니다.",
                    "《달의 그림자 탑》은 이 고전적 모티프를 현대적 다크 판타지로 재해석했습니다. 완전무결함을 강요받는 상위 품계와 달리, 제9품계 천사들은 상처받고 흔들리며 서로에게 의지하는 가장 인간적인 존재들입니다.",
                    "달의 위상이 차오르고 기울듯 불완전하기에 흔들리는 그들의 서사는, 맹목적인 복종이 아닌 '자신의 의지와 동료를 향한 유대'로 신성한 구원을 쟁취하는 여정을 보여줍니다."
                ],
                tags: ["#단테신곡", "#천국편제1천", "#월구모티프", "#불완전함의미학"],
                quote: "완벽하지 않기에 흔들리고, 흔들리기에 서로의 온기를 온전히 갈망한다."
            },
            {
                id: "silence",
                tabName: "신의 침묵",
                tabIcon: "church",
                tag: "CRISIS · DEUS SILENS",
                title: "100년 성전 속 돌연 시작된 신의 절대적 침묵",
                paragraphs: [
                    "천계와 마계의 치열한 전쟁이 100년에 이르던 무렵, 천상계의 모든 신탁과 기도의 응답이 일순간에 소멸했습니다.",
                    "사전 경고도 사후 해명도 없이 월구의 대문은 굳게 닫혔고, 최전선에서 싸우던 제9품계 병사들은 차가운 지상에 버려졌습니다. 이것이 상급 천사들의 배신인지, 아니면 신의 또 다른 안배인지는 베일에 싸여 있습니다.",
                    "침묵하는 신을 향한 분노와 배신감, 그리고 체념 속에서도 그들은 결코 무릎 꿇지 않고 탑의 정상에서 진실을 확인하고자 합니다."
                ],
                tags: ["#월구대문봉쇄", "#절대침묵", "#사라진계시", "#천상계의의문"],
                quote: "어찌하여 문은 봉쇄되었고, 신은 침묵하는가에 대해서는 추후 시리즈로 다루길 고대하고 있습니다."
            },
            {
                id: "erosion",
                tabName: "인계 침식",
                tabIcon: "feather",
                tag: "CORRUPTION · MORTAL EROSION",
                title: "천사성의 상실, 3단계 인계 침식(Mortal Erosion)",
                paragraphs: [
                    "순수한 천상 에테르로 지탱되던 천사의 신체는 탁기와 유한성으로 가득한 지상에 머물수록 점진적으로 부식되어 갑니다.",
                    "1단계에서 순백의 날개가 잿빛으로 퇴색되고 광륜이 점멸하며, 2단계에선 깃털이 석화처럼 굳어져 하늘을 날 수 없게 됩니다. 마지막 3단계에 이르면 영핵(Core)마저 붕괴되어 천사성을 영영 잃고 낙천사로 전락합니다.",
                    "시간이 지날수록 침식은 깊어지지만, 그들은 인간들의 고통과 온기에 공감하며 역설적으로 광기를 이겨내고 스스로의 존재 가치를 증명해 나갑니다."
                ],
                tags: ["#인계침식", "#날개변색", "#깃털석화", "#영핵붕괴"],
                quote: "순백의 깃털이 잿빛으로 굳어갈지라도, 존재의 존엄마저 탁기에 바치진 않는다."
            },
            {
                id: "tower",
                tabName: "달의 그림자 탑",
                tabIcon: "fort",
                tag: "ASCENT · 7 LUNAR PHASES",
                title: "연금술적 시련의 공간, 7대 달의 위상과 정화의 나선",
                paragraphs: [
                    "달의 그림자 탑은 물리적인 석탑이 아닌, 달의 인력과 위상 변화가 지상에 투영되어 형성된 거대한 에테르 나선 축선입니다.",
                    "탑은 1층 삭(망각)에서부터 상현, 만월(각성), 그리고 7층 월식(붉은 문)에 이르는 7개의 위상으로 이루어져 있습니다. 층을 오르는 행위는 침식된 자아와 각자의 내면적 상처(분노, 체념, 침묵, 기만)를 직면하는 연금술적 시련입니다.",
                    "네 천사가 서로의 영혼을 믿고 온전히 하나로 맞물릴 때, 비로소 최상층 월식의 문이 열리고 닫혀버린 월구로의 귀환로가 드러나게 됩니다."
                ],
                tags: ["#달의그림자탑", "#7대위상", "#만월의각성", "#월식의문"],
                quote: "일곱 번의 어둠과 시험을 통과한 자만이 비로소 붉은 문 너머의 새벽을 마주하리라."
            }
        ]
    };

    async function loadAndRenderWorldview() {
        let wvData = defaultWorldview;
        try {
            const res = await fetch('data/worldview.json');
            if (res.ok) wvData = await res.json();
        } catch (err) {
            console.warn("Could not load data/worldview.json, using fallback:", err);
        }
        renderWorldviewCodex(wvData);
    }

    function renderWorldviewCodex(data) {
        if (!worldviewTabsContainer || !worldviewPanesContainer) return;

        const headerTag = document.getElementById("worldview-tag");
        const headerTitle = document.getElementById("worldview-title");
        if (headerTag && data.header?.tag) headerTag.textContent = data.header.tag;
        if (headerTitle && data.header?.title) headerTitle.textContent = data.header.title;

        const chapters = data.chapters || [];
        const total = chapters.length;

        worldviewTabsContainer.innerHTML = chapters.map((ch, i) => `
            <button class="tab-slider-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                ${renderIcon(ch.tabIcon, 'auto_stories')}
                <span>${ch.tabName}</span>
            </button>
        `).join('');

        worldviewPanesContainer.innerHTML = chapters.map((ch, i) => {
            const paragraphs = ch.paragraphs || (ch.summary ? [ch.summary] : (ch.lead ? [ch.lead] : []));
            const paragraphsHtml = paragraphs.map(p => `<p>${p}</p>`).join('');
            const tagsHtml = (ch.tags && ch.tags.length) ? `
                <div class="single-card-tags">
                    ${ch.tags.map(t => `<span class="keyword-chip">${t}</span>`).join('')}
                </div>
            ` : '';

            const footerQuoteHtml = ch.quote ? `
                <div class="single-card-footer">
                    <span class="material-symbols-outlined">format_quote</span>
                    <p>"${ch.quote}"</p>
                </div>
            ` : '';

            return `
                <div class="tab-slider-pane ${i === 0 ? 'active' : ''}" id="wv-pane-${ch.id}">
                    <div class="single-codex-card">
                        <div class="single-card-header">
                            <span class="single-card-tag">${ch.tag}</span>
                            <h3 class="single-card-title">${ch.title}</h3>
                        </div>
                        <div class="single-card-body">
                            ${paragraphsHtml}
                            ${tagsHtml}
                        </div>
                        ${footerQuoteHtml}
                    </div>
                    ${createSlideNavBarHtml(i, total)}
                </div>
            `;
        }).join('');

        worldviewSlider = setupTabSlider(worldviewTabsContainer, worldviewPanesContainer);
    }

    // Worldview Modal triggers
    if (btnOpenWorldview) {
        btnOpenWorldview.addEventListener("click", () => {
            if (worldviewSlider) worldviewSlider.goTo(0);
            openCustomModal(worldviewModal);
        });
    }
    if (btnCloseWorldview) {
        btnCloseWorldview.addEventListener("click", () => closeCustomModal(worldviewModal));
    }
    if (worldviewModal) {
        worldviewModal.addEventListener("click", (e) => {
            if (e.target === worldviewModal) closeCustomModal(worldviewModal);
        });
    }

    // Initialize worldview loading
    loadAndRenderWorldview();

    // ----------------------------------------------------
    // 8. Dynamic Characters Data Loader (from data/characters.json)
    // ----------------------------------------------------
    let characterList = [];

    const defaultCharacters = [
        {
            id: "nebbia",
            name: "네비아",
            enName: "Nebbia",
            rankBadge: "제9품계 하급 천사 · 전사",
            meta: "여성 / 전사 / 제9품계",
            weapon: { icon: "auto_fix_high", text: "은빛 레이피어" },
            tags: ["#까칠한츤데레", "#신의침묵에분노", "#속정깊음", "#잿빛날개"],
            appearance: "헝클어진 금발 단발, 날카롭고 강렬한 녹안(Emerald Eyes). 지상 전장의 흙먼지가 묻은 은빛 경갑주를 걸쳤으며, 인계 침식으로 인해 본래 순백이던 날개가 잿빛으로 흐려져 있습니다.",
            personality: "까칠하고 틱틱대는 츤데레 전사. 신의 침묵을 명백한 배신으로 여겨 분노를 감추지 않습니다. 그러나 동료를 누구보다 아끼며, 툭툭 내뱉는 날 선 반말 뒤로 혀를 차거나 시선을 피하며 챙겨줍니다.",
            quote: "착각하지 마. 널 구한 게 아니라 저놈 모가지를 벤 것뿐이니까. 따라올 거면 발소리나 죽여.",
            image: "assets/images/nebbia/nebbia_01.png",
            wideImage: "assets/images/nebbia/nebbia_wide.png",
            visualClass: "char-visual-nebbia",
            tabAvatarClass: "tab-nebbia"
        },
        {
            id: "calliste",
            name: "칼리스테",
            enName: "Calliste",
            rankBadge: "제9품계 하급 천사 · 관조·기록",
            meta: "여성 / 관조·기록 / 제9품계",
            weapon: { icon: "menu_book", text: "낡은 면사포 & 경화된 날개" },
            tags: ["#소심하고조용함", "#체념적성향", "#비행불가", "#서글픈존댓말"],
            appearance: "풍성하게 구불거리는 긴 은발, 항상 눈물이 고인 듯 맑고 투명한 벽안(Cyan Eyes). 머리에는 올이 풀린 낡은 면사포를 둘렀으며, 한쪽 날개가 완전히 석화처럼 경화되어 더 이상 하늘을 날 수 없습니다.",
            personality: "소심하고 조용하며, 버려진 처지를 서글프게 직시하는 체념적 성향. 말끝을 흐리는 나지막하고 가녀린 존댓말을 쓰며, 불안할 때면 낡은 옷소매를 꼭 쥐는 버릇이 있습니다.",
            quote: "돌아갈 수 있을까요……? 우린 버려진 거예요. 그러니…… 너무 애쓰지 마세요.",
            image: "assets/images/calliste/calliste_01.png",
            wideImage: "assets/images/calliste/calliste_wide.png",
            visualClass: "char-visual-calliste",
            tabAvatarClass: "tab-calliste"
        },
        {
            id: "hellio",
            name: "헬리오",
            enName: "Hellio",
            rankBadge: "제9품계 하급 천사 · 전사·선봉",
            meta: "남성 / 전사·선봉 / 제9품계",
            weapon: { icon: "gavel", text: "묵직한 대검" },
            tags: ["#철저한현실주의", "#감정절제", "#과거배신경험", "#듬직한탱커"],
            appearance: "차분하게 정돈된 회색 머리, 건조하고 단호한 회안(Grey Eyes). 단련된 다부진 체격 위에 낡은 검은 가죽 코트를 걸치고 있으며, 거대한 양손 대검을 덤덤하게 짊어지고 있습니다.",
            personality: "철저한 현실주의자이자 감정에 휘둘리지 않는 든든한 선봉장. 과거 상위 천사에게 희생양으로 버림받았던 기억이 있습니다. 단정하고 건조한 존댓말/반존대를 구사하며 철저히 팩트만을 전달합니다.",
            quote: "방패는 부러지지 않았다. 네 몫까지 내가 버틸 테니, 뒤돌아보지 마라.",
            image: "assets/images/hellio/hellio_01.png",
            wideImage: "assets/images/hellio/hellio_wide.png",
            visualClass: "char-visual-hellio",
            tabAvatarClass: "tab-hellio"
        },
        {
            id: "sinope",
            name: "시노페",
            enName: "Sinope",
            rankBadge: "제9품계 하급 천사 · 궁수·정찰",
            meta: "여성 / 궁수·정찰 / 제9품계",
            weapon: { icon: "colorize", text: "칠흑의 곡궁" },
            tags: ["#능글맞은장난기", "#가면뒤의어둠", "#가장깊은침식", "#유쾌한독설"],
            appearance: "어깨까지 내려오는 흑발의 웨이브, 붉은 빛이 도는 자안(Violet Eyes). 눈가에 장난스러운 눈웃음을 띠고 있으며, 인계 침식이 가장 깊이 진행되어 날개 끝에서 검은 재가 흩날립니다.",
            personality: "늘 가볍고 장난기 넘치는 말투로 본심을 감추는 기만형 궁수. 겉으로는 실없는 소리를 던지지만, 누구보다 냉철하게 전장의 흐름을 읽고 있습니다.",
            quote: "어머, 신앙심이라니? 날개가 부러지면 신도 악마도 다 똑같은 신세인걸요~ 안 그래요?",
            image: "assets/images/sinope/sinope_01.png",
            wideImage: "assets/images/sinope/sinope_wide.png",
            visualClass: "char-visual-sinope",
            tabAvatarClass: "tab-sinope"
        }
    ];

    async function loadAndRenderCharacters() {
        try {
            const response = await fetch('data/characters.json');
            if (response.ok) {
                characterList = await response.json();
            } else {
                characterList = defaultCharacters;
            }
        } catch (e) {
            console.warn("Could not load data/characters.json, using fallback character list:", e);
            characterList = defaultCharacters;
        }
        renderCharacterDossier(characterList);
    }

    function renderCharacterDossier(characters) {
        if (!charTabsContainer || !charPanesContainer) return;
        const total = characters.length;

        charTabsContainer.innerHTML = characters.map((c, i) => `
            <button class="tab-slider-btn tab-btn ${i === 0 ? 'active' : ''}" data-target="char-${c.id}">
                <span class="tab-avatar ${c.tabAvatarClass || 'tab-' + c.id}" ${c.image ? `style="background-image: url('${c.image}'); background-size: cover; background-position: center;"` : ''}></span>
                <span class="tab-name">${c.name}</span>
            </button>
        `).join('');

        charPanesContainer.innerHTML = characters.map((c, i) => `
            <div class="tab-slider-pane char-pane ${i === 0 ? 'active' : ''}" id="char-${c.id}">
                <div class="pane-grid">
                    <div class="pane-visual ${c.visualClass || 'char-visual-' + c.id}" ${c.image ? `style="background-image: url('${c.image}'); background-size: cover; background-position: center top;"` : ''}>
                        ${c.image ? `<img src="${c.image}" alt="${c.name}" class="char-portrait-img">` : ''}
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
                            <h4><span class="material-symbols-outlined">person</span> 외형</h4>
                            <p>${c.appearance || ''}</p>
                        </div>

                        <div class="ch-section">
                            <h4><span class="material-symbols-outlined">chat_bubble</span> 성격</h4>
                            <p>${c.personality || ''}</p>
                        </div>

                        <div class="ch-quote-box">
                            <div class="quote-tag"><span class="material-symbols-outlined">format_quote</span> 대표 대사</div>
                            <p class="quote-text">"${c.quote || ''}"</p>
                        </div>
                    </div>
                </div>
                ${createSlideNavBarHtml(i, total)}
            </div>
        `).join('');

        let activeBackdropLayer = 'a';
        function updateCharacterBackdrop(index) {
            const char = characters[index];
            if (!char) return;
            const wideImg = char.wideImage || char.image;
            if (!wideImg) return;

            const layerA = document.getElementById("char-backdrop-a");
            const layerB = document.getElementById("char-backdrop-b");
            if (!layerA || !layerB) return;

            if (activeBackdropLayer === 'a') {
                layerB.style.backgroundImage = `url('${wideImg}')`;
                layerB.classList.add("active");
                layerA.classList.remove("active");
                activeBackdropLayer = 'b';
            } else {
                layerA.style.backgroundImage = `url('${wideImg}')`;
                layerA.classList.add("active");
                layerB.classList.remove("active");
                activeBackdropLayer = 'a';
            }
        }

        charactersSlider = setupTabSlider(charTabsContainer, charPanesContainer, (index) => {
            updateCharacterBackdrop(index);
        });

        // Set initial backdrop on Layer A
        const initialLayerA = document.getElementById("char-backdrop-a");
        const initialLayerB = document.getElementById("char-backdrop-b");
        if (initialLayerA && characters[0]) {
            const firstImg = characters[0].wideImage || characters[0].image;
            if (firstImg) initialLayerA.style.backgroundImage = `url('${firstImg}')`;
            initialLayerA.classList.add("active");
            if (initialLayerB) initialLayerB.classList.remove("active");
            activeBackdropLayer = 'a';
        }
    }

    // Initialize character loading
    loadAndRenderCharacters();

    if (btnOpenCharacters) {
        btnOpenCharacters.addEventListener("click", () => {
            if (charactersSlider) charactersSlider.goTo(0);
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
    // 9. Author's Notes (Deep Lore) (from data/author_notes.json)
    // ----------------------------------------------------
    const defaultAuthorNotes = {
        header: {
            tag: "PRODUCTION NOTES & DEEP LORE",
            title: "제작노트"
        },
        chapters: [
            {
                id: "vision",
                tabName: "기획 의도",
                tabIcon: "history_edu",
                tag: "CREATOR'S VISION · PILGRIMAGE",
                title: "불완전한 존재들의 실존적 순례에 관하여",
                paragraphs: [
                    "《달의 그림자 탑》은 완전무결한 영웅의 승리가 아닌, 신에게 버림받고도 서로의 체온에 기대어 가장 어두운 밤을 뚫고 빛을 찾아 나서는 존재들의 이야기입니다.",
                    "하늘로부터 버림받은 하급 천사들은 더 이상 명령이나 사명에 의해 움직이지 않습니다. 오직 '동료와의 유대'와 '자기 자신의 의지'로써 하늘을 향해 발을 내딛습니다.",
                    "달의 그림자 탑을 오르는 것은 물리적인 이동이 아닌, 각 층마다 마주하는 자신의 내면적 상처와 타락의 공포를 극복하는 정화(Catharsis)의 과정입니다."
                ],
                tags: ["#실존주의", "#버려진천사", "#유대와선택", "#정화의나선", "#내면의치유"],
                quote: "하늘이 우리를 버렸을지라도, 우리가 서로를 놓지 않는 한 이곳은 지옥이 아니다."
            },
            {
                id: "dante_lore",
                tabName: "월구와 제9품계",
                tabIcon: "dark_mode",
                tag: "DEEP LORE · THE 9TH CHOIR",
                title: "단테 《신곡》과 월구(Primo Cielo)의 철학",
                paragraphs: [
                    "단테의 《천국편》에서 월구는 맹세를 온전히 완수하지 못한 불완전한 영혼들이 머무는 곳입니다.",
                    "치천사(세라핌)부터 최말단 천사(엔젤)에 이르는 9품계 중, 제9품계는 신의 옥좌와 가장 멀리 떨어진 전선의 병사들로 가장 인간에 가까운 감정을 지니고 있습니다.",
                    "완벽하지 않기에 흔들리고, 흔들리기에 서로를 갈망하는 불완전한 서원의 존재들이 만들어내는 비장하고도 따뜻한 드라마를 그리고자 했습니다."
                ],
                tags: ["#제9품계", "#말단천사", "#인간적감정", "#불완전함의미학", "#서원과갈등"],
                quote: "완벽하지 않기에 흔들리고, 흔들리기에 서로의 온기를 온전히 갈망한다."
            },
            {
                id: "silence_lore",
                tabName: "신의 침묵과 봉쇄",
                tabIcon: "key",
                tag: "MYSTERY · DEUS SILENS",
                title: "전쟁 97년 차 월구 대문 봉쇄 사건",
                paragraphs: [
                    "천상으로 통하는 유일한 나선 통로였던 월구의 대문이 안쪽에서 일방적으로 봉쇄되며 절대 침묵이 시작되었습니다.",
                    "사전 경고도 사후 해명도 없이 기도의 응답은 끊겼으며, 상급 천사들의 배신 의혹과 지상 방치에 대한 의문은 작품 전반을 관통하는 거대한 미스터리입니다.",
                    "지상에 버려진 제9품계 천사들은 상급 계층의 사슬에서 벗어나 비로소 자신만의 의지로 운명을 개척해 나갑니다."
                ],
                tags: ["#천계봉쇄", "#사라진신탁", "#음모와의문", "#자유의지"],
                quote: "어찌하여 문은 봉쇄되었고, 신은 침묵하는가에 대해서는 추후 시리즈로 다루길 고대하고 있습니다."
            },
            {
                id: "tower_lore",
                tabName: "달의 위상 연금술",
                tabIcon: "science",
                tag: "ALCHEMICAL ASCENT · 7 PHASES",
                title: "7대 위상과 정화의 나선 구조",
                paragraphs: [
                    "달의 그림자 탑은 단순한 건물이 아니라, 달의 위상 변화가 지상에 투영된 거대한 연금술적 시련의 공간입니다.",
                    "삭(망각)에서 월식(붉은 관문)에 이르는 7개 층은 4명의 천사가 각자 품고 있는 내면의 균열(분노, 체념, 방관, 기만)을 강제로 직면하게 만듭니다.",
                    "붉게 물든 최상층 월식의 문 앞에는 탑의 수호자가 기다리고 있으며, 4인의 천사가 서로의 영혼을 믿고 합일할 때 비로소 문이 열리게 됩니다."
                ],
                tags: ["#7개위상", "#내면의시련", "#심리적관문", "#월식의문"],
                quote: "일곱 번의 어둠과 시험을 통과한 자만이 비로소 붉은 문 너머의 새벽을 마주하리라."
            }
        ]
    };

    async function loadAndRenderAuthorNotes() {
        let notesData = defaultAuthorNotes;
        try {
            const res = await fetch('data/author_notes.json');
            if (res.ok) notesData = await res.json();
        } catch (err) {
            console.warn("Could not load data/author_notes.json, using fallback:", err);
        }
        renderAuthorNotesCodex(notesData);
    }

    function renderAuthorNotesCodex(data) {
        if (!authorNotesTabsContainer || !authorNotesPanesContainer) return;

        const headerTag = document.getElementById("author-notes-tag");
        const headerTitle = document.getElementById("author-notes-title");
        if (headerTag && data.header?.tag) headerTag.textContent = data.header.tag;
        if (headerTitle && data.header?.title) headerTitle.textContent = data.header.title;

        const chapters = data.chapters || [];
        const total = chapters.length;

        authorNotesTabsContainer.innerHTML = chapters.map((ch, i) => `
            <button class="tab-slider-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                ${renderIcon(ch.tabIcon, 'history_edu')}
                <span>${ch.tabName}</span>
            </button>
        `).join('');

        authorNotesPanesContainer.innerHTML = chapters.map((ch, i) => {
            const paragraphs = ch.paragraphs || (ch.lead ? [ch.lead] : []);
            const paragraphsHtml = paragraphs.map(p => `<p>${p}</p>`).join('');
            const tagsHtml = (ch.tags && ch.tags.length) ? `
                <div class="single-card-tags">
                    ${ch.tags.map(t => `<span class="keyword-chip">${t}</span>`).join('')}
                </div>
            ` : '';

            const footerQuoteHtml = ch.quote ? `
                <div class="single-card-footer">
                    <span class="material-symbols-outlined quote-icon">format_quote</span>
                    <p>"${ch.quote}"</p>
                </div>
            ` : '';

            return `
                <div class="tab-slider-pane ${i === 0 ? 'active' : ''}" id="an-pane-${ch.id}">
                    <div class="single-codex-card">
                        <div class="single-card-header">
                            <span class="single-card-tag">${ch.tag}</span>
                            <h3 class="single-card-title">${ch.title}</h3>
                        </div>
                        <div class="single-card-body">
                            ${paragraphsHtml}
                            ${tagsHtml}
                        </div>
                        ${footerQuoteHtml}
                    </div>
                    ${createSlideNavBarHtml(i, total)}
                </div>
            `;
        }).join('');

        authorNotesSlider = setupTabSlider(authorNotesTabsContainer, authorNotesPanesContainer);
    }

    // Author's Notes Modal triggers
    if (btnOpenAuthorNotes) {
        btnOpenAuthorNotes.addEventListener("click", () => {
            if (authorNotesSlider) authorNotesSlider.goTo(0);
            openCustomModal(authorNotesModal);
        });
    }
    if (btnCloseAuthorNotes) {
        btnCloseAuthorNotes.addEventListener("click", () => closeCustomModal(authorNotesModal));
    }
    if (authorNotesModal) {
        authorNotesModal.addEventListener("click", (e) => {
            if (e.target === authorNotesModal) closeCustomModal(authorNotesModal);
        });
    }

    // Initialize author notes loading
    loadAndRenderAuthorNotes();

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
    let lastVolume = 1.0;

    if (bgmAudio) {
        bgmAudio.volume = 1.0;

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
                if (bgmIcon) bgmIcon.textContent = "pause";
                bgmToggleBtn.setAttribute("title", "음악 일시정지");
            } else {
                bgmPlayer.classList.remove("bgm-playing");
                if (bgmIcon) bgmIcon.textContent = "play_arrow";
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
                    const restoredVol = lastVolume > 0 ? lastVolume : 1.0;
                    bgmAudio.volume = restoredVol;
                    if (bgmVolume) bgmVolume.value = restoredVol;
                    updateVolumeIcon(restoredVol);
                }
            });
        }

        function updateVolumeIcon(vol) {
            if (!volumeIcon) return;
            if (vol === 0) {
                volumeIcon.textContent = "volume_off";
            } else if (vol < 0.5) {
                volumeIcon.textContent = "volume_down";
            } else {
                volumeIcon.textContent = "volume_up";
            }
        }

        bgmAudio.addEventListener("play", () => updateBgmUI(true));
        bgmAudio.addEventListener("pause", () => updateBgmUI(false));
    } else {
        window.tryStartBgm = function() {};
    }

    // ----------------------------------------------------
    // 10. Mobile Hamburger Menu Controller
    // ----------------------------------------------------
    const navHamburger = document.getElementById("nav-hamburger");
    const navHamburgerIcon = document.getElementById("nav-hamburger-icon");
    const navLinks = document.getElementById("nav-links");

    function closeMobileMenu() {
        if (navLinks && navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            if (navHamburger) {
                navHamburger.classList.remove("active");
                navHamburger.setAttribute("aria-expanded", "false");
            }
            if (navHamburgerIcon) {
                navHamburgerIcon.textContent = "menu";
            }
        }
    }

    function toggleMobileMenu() {
        if (!navLinks) return;
        const isOpen = navLinks.classList.toggle("open");
        if (navHamburger) {
            navHamburger.classList.toggle("active", isOpen);
            navHamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
        }
        if (navHamburgerIcon) {
            navHamburgerIcon.textContent = isOpen ? "close" : "menu";
        }
    }

    if (navHamburger) {
        navHamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navLinks && navLinks.classList.contains("open")) {
            if (!navLinks.contains(e.target) && (!navHamburger || !navHamburger.contains(e.target))) {
                closeMobileMenu();
            }
        }
    });

    // Close mobile menu when a nav button is clicked
    if (btnOpenWorldview) {
        btnOpenWorldview.addEventListener("click", closeMobileMenu);
    }
    if (btnOpenCharacters) {
        btnOpenCharacters.addEventListener("click", closeMobileMenu);
    }
    if (btnOpenAuthorNotes) {
        btnOpenAuthorNotes.addEventListener("click", closeMobileMenu);
    }

    // Reset when resizing back to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMobileMenu();
        }
    });

    // Keyboard Navigation (Escape to close, ArrowLeft / ArrowRight to slide tabs)
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMobileMenu();
            if (!detailContainer.classList.contains("hidden")) {
                closeDetailView();
            }
            if (!worldviewModal.classList.contains("hidden")) {
                closeCustomModal(worldviewModal);
            }
            if (!charactersModal.classList.contains("hidden")) {
                closeCustomModal(charactersModal);
            }
            if (!authorNotesModal.classList.contains("hidden")) {
                closeCustomModal(authorNotesModal);
            }
        } else if (e.key === "ArrowRight") {
            if (!worldviewModal.classList.contains("hidden")) {
                worldviewSlider?.next();
            } else if (!charactersModal.classList.contains("hidden")) {
                charactersSlider?.next();
            } else if (!authorNotesModal.classList.contains("hidden")) {
                authorNotesSlider?.next();
            }
        } else if (e.key === "ArrowLeft") {
            if (!worldviewModal.classList.contains("hidden")) {
                worldviewSlider?.prev();
            } else if (!charactersModal.classList.contains("hidden")) {
                charactersSlider?.prev();
            } else if (!authorNotesModal.classList.contains("hidden")) {
                authorNotesSlider?.prev();
            }
        }
    });
});
