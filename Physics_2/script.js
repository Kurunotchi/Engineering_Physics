// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked tab and button
        document.getElementById(tabName).classList.add('active');
        btn.classList.add('active');
    });
});

// Level Navigation in Problems Tab
document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const level = btn.getAttribute('data-level');
        
        // Remove active class from all level content and buttons
        document.querySelectorAll('.level-content').forEach(content => content.classList.remove('active'));
        document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class
        document.getElementById('level-' + level).classList.add('active');
        btn.classList.add('active');
    });
});

// Update slider displays and auto-calculate
function setupSliders() {
    // Problem 1: Conduction
    const p1Sliders = ['p1-k', 'p1-dT', 'p1-L'];
    p1Sliders.forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', () => {
                const spanId = id + '-val';
                document.getElementById(spanId).textContent = slider.value;
                calculateP1();
            });
        }
    });

    // Problem 2: Convection
    const p2Sliders = ['p2-h', 'p2-Ts', 'p2-Tinf'];
    p2Sliders.forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', () => {
                const spanId = id + '-val';
                document.getElementById(spanId).textContent = slider.value;
                calculateP2();
            });
        }
    });

    // Problem 3: Radiation
    const p3Sliders = ['p3-eps', 'p3-Ts', 'p3-Tsurr'];
    p3Sliders.forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', () => {
                const spanId = id + '-val';
                document.getElementById(spanId).textContent = slider.value;
                calculateP3();
            });
        }
    });

    // Problem 4: Thermal Resistance
    const p4Sliders = ['p4-k1', 'p4-L1', 'p4-k2', 'p4-L2'];
    p4Sliders.forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', () => {
                const spanId = id + '-val';
                document.getElementById(spanId).textContent = slider.value;
                calculateP4();
            });
        }
    });

    // Problem 5: Combined
    const p5Sliders = ['p5-k', 'p5-L', 'p5-h', 'p5-T1', 'p5-T2'];
    p5Sliders.forEach(id => {
        const slider = document.getElementById(id);
        if (slider) {
            slider.addEventListener('input', () => {
                const spanId = id + '-val';
                document.getElementById(spanId).textContent = slider.value;
                calculateP5();
            });
        }
    });
}

// Problem 1: Conduction Heat Flux (q = k * dT / L)
function calculateP1() {
    const k = parseFloat(document.getElementById('p1-k').value);
    const dT = parseFloat(document.getElementById('p1-dT').value);
    const L = parseFloat(document.getElementById('p1-L').value);
    const A = parseFloat(document.getElementById('p1-A').value);
    
    const q_flux = (k * dT) / L;
    const Q = q_flux * A;
    
    const resultDiv = document.getElementById('p1-result');
    resultDiv.innerHTML = `
        <strong>Results:</strong><br>
        Heat Flux (q): ${q_flux.toFixed(2)} W/m²<br>
        Total Heat Transfer (Q): ${Q.toFixed(2)} W
    `;
}

// Problem 2: Convection Heat Transfer (q = h * (Ts - Tinf) * A)
function calculateP2() {
    const h = parseFloat(document.getElementById('p2-h').value);
    const Ts = parseFloat(document.getElementById('p2-Ts').value);
    const Tinf = parseFloat(document.getElementById('p2-Tinf').value);
    const A = parseFloat(document.getElementById('p2-A').value);
    
    const Q = h * (Ts - Tinf) * A;
    
    const resultDiv = document.getElementById('p2-result');
    resultDiv.innerHTML = `
        <strong>Results:</strong><br>
        Temperature Difference (ΔT): ${(Ts - Tinf).toFixed(2)} °C<br>
        Total Heat Transfer (Q): ${Q.toFixed(2)} W
    `;
}

// Problem 3: Radiation Heat Transfer (q = ε * σ * (Ts^4 - Tsurr^4) * A)
function calculateP3() {
    const SIGMA = 5.67e-8; // Stefan-Boltzmann constant
    const eps = parseFloat(document.getElementById('p3-eps').value);
    const Ts = parseFloat(document.getElementById('p3-Ts').value);
    const Tsurr = parseFloat(document.getElementById('p3-Tsurr').value);
    const A = parseFloat(document.getElementById('p3-A').value);
    
    const Q = eps * SIGMA * A * (Math.pow(Ts, 4) - Math.pow(Tsurr, 4));
    const q_flux = Q / A;
    
    const resultDiv = document.getElementById('p3-result');
    resultDiv.innerHTML = `
        <strong>Results:</strong><br>
        Heat Flux (q): ${q_flux.toFixed(2)} W/m²<br>
        Total Heat Transfer (Q): ${Q.toFixed(2)} W
    `;
}

// Problem 4: Thermal Resistance (Series)
function calculateP4() {
    const k1 = parseFloat(document.getElementById('p4-k1').value);
    const L1 = parseFloat(document.getElementById('p4-L1').value);
    const k2 = parseFloat(document.getElementById('p4-k2').value);
    const L2 = parseFloat(document.getElementById('p4-L2').value);
    const A = parseFloat(document.getElementById('p4-A').value);
    
    const R1 = L1 / (k1 * A);
    const R2 = L2 / (k2 * A);
    const R_total = R1 + R2;
    
    const resultDiv = document.getElementById('p4-result');
    resultDiv.innerHTML = `
        <strong>Thermal Resistance Analysis:</strong><br>
        Layer 1 Resistance (R₁): ${R1.toFixed(4)} K/W<br>
        Layer 2 Resistance (R₂): ${R2.toFixed(4)} K/W<br>
        Total Resistance (R_total): ${R_total.toFixed(4)} K/W<br>
        <em>Lower total resistance = faster heat transfer</em>
    `;
}

// Problem 5: Combined Conduction and Convection
function calculateP5() {
    const k = parseFloat(document.getElementById('p5-k').value);
    const L = parseFloat(document.getElementById('p5-L').value);
    const h = parseFloat(document.getElementById('p5-h').value);
    const T1 = parseFloat(document.getElementById('p5-T1').value);
    const T2 = parseFloat(document.getElementById('p5-T2').value);
    
    const A = 1; // 1 m² standard
    
    // Thermal resistances
    const R_cond = L / (k * A);
    const R_conv = 1 / (h * A);
    const R_total = R_cond + R_conv;
    
    // Heat transfer
    const Q = (T1 - T2) / R_total;
    
    const resultDiv = document.getElementById('p5-result');
    resultDiv.innerHTML = `
        <strong>Combined Heat Transfer Results:</strong><br>
        Conduction Resistance: ${R_cond.toFixed(4)} K/W<br>
        Convection Resistance: ${R_conv.toFixed(4)} K/W<br>
        Total Resistance: ${R_total.toFixed(4)} K/W<br>
        <strong>Heat Transfer Rate (Q): ${Q.toFixed(2)} W</strong><br>
        <em>The larger resistance dominates the overall heat transfer rate</em>
    `;
}

// Problem 6: Multi-layer system
function calculateP6() {
    const resultDiv = document.getElementById('p6-result');
    resultDiv.innerHTML = `
        <strong>Multi-Layer Thermal Network:</strong><br>
        For a system with multiple layers in series, the total thermal resistance is the sum of individual resistances.<br>
        <br>
        <strong>Concept:</strong> Understanding how different materials and convection combine to control heat flow is essential in real engineering applications like building insulation, heat exchangers, and thermal management systems.
    `;
}

// Toggle solution visibility
function toggleSolution(id) {
    const element = document.getElementById(id);
    element.classList.toggle('hidden');
}

// Dark mode toggle
document.getElementById('dark-toggle').addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', 
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupSliders();
    // Auto-calculate problems on load
    calculateP1();
    calculateP2();
    calculateP3();
    calculateP4();
    calculateP5();
});

// MathJax typesetting when content changes
if (typeof MathJax !== 'undefined') {
    MathJax.typesetPromise().catch(err => console.log(err));
}
