// Dados das empresas
const companiesData = {
    'technova': {
        name: 'TechNova Systems',
        period: 'Nov 2023 - Presente',
        position: 'Arquiteto de Sistemas Sênior',
        achievements: [
            'Arquitetei uma plataforma distribuída de streaming de eventos lidando com mais de 1M eventos/seg',
            'Reduzi custos de infraestrutura em 40% através de otimização serverless',
            'Liderei uma equipe de 10 engenheiros na migração de monólitos legados para microsserviços',
            'Implementei práticas de engenharia do caos para melhorar a resiliência do sistema'
        ]
    },
    'orbital': {
        name: 'Orbital Dynamics',
        period: 'Ago 2018 - Out 2023 (5+ anos)',
        position: 'Engenheiro Frontend Líder',
        achievements: [
            'Construí um painel de telemetria de satélite em tempo real usando WebGL e WebSockets',
            'Desenvolvi uma biblioteca de componentes proprietária usada em 5 produtos internos',
            'Melhorei o tempo de carregamento da aplicação em 60% através de code splitting e lazy loading',
            'Mentorei desenvolvedores júnior e estabeleci padrões de revisão de código'
        ]
    },
    'pixelperfect': {
        name: 'PixelPerfect Studios',
        period: 'Jan 2016 - Jul 2018',
        position: 'Tecnólogo Criativo',
        achievements: [
            'Criei experiências interativas premiadas para clientes da Fortune 500',
            'Fiz a ponte entre equipes de design e engenharia',
            'Prototipei conceitos de RA/RV usando Unity e Three.js',
            'Otimizei pipelines de animação para experiências web de alta performance'
        ]
    },
    'cyberdyne': {
        name: 'Cyberdyne Systems',
        period: 'Jun 2013 - Dez 2015',
        position: 'Engenheiro de Pesquisa em IA',
        achievements: [
            'Desenvolvi modelos de redes neurais para manutenção preditiva',
            'Otimizei mecanismos de inferência para dispositivos de borda (edge devices)',
            'Publiquei 3 artigos sobre aprendizado por reforço em automação industrial',
            'Colaborei com equipes de robótica em algoritmos de fusão de sensores'
        ]
    },
    'aperture': {
        name: 'Aperture Science',
        period: 'Jan 2012 - Mai 2013',
        position: 'Engenheiro de Testes',
        achievements: [
            'Automatizei fluxos de trabalho de teste reduzindo o tempo de ciclo em 80%',
            'Desenvolvi frameworks de teste personalizados para hardware experimental',
            'Mantive 99,9% de uptime para sistemas de controle de instalações de teste',
            'Documentei protocolos de segurança para ambientes de teste perigosos'
        ]
    },
    'blackmesa': {
        name: 'Black Mesa',
        period: 'Jun 2010 - Dez 2011',
        position: 'Estagiário de Pesquisa',
        achievements: [
            'Auxiliei na análise de dados para pesquisa de materiais anômalos',
            'Desenvolvi ferramentas de visualização para simulações de cascata de ressonância',
            'Dei suporte a cientistas seniores em experimentos laboratoriais',
            'Contribuí para o desenvolvimento da interface do traje HEV'
        ]
    }
};

// Função para abrir o modal
function openCompanyModal(companyKey) {
    console.log('Tentando abrir modal para:', companyKey);
    
    const company = companiesData[companyKey];
    if (!company) {
        console.error('Dados da empresa não encontrados para:', companyKey);
        return;
    }
    
    const modal = document.getElementById('company-modal');
    const modalName = document.getElementById('modal-company-name');
    const modalPeriod = document.getElementById('modal-period');
    const modalPosition = document.getElementById('modal-position');
    const modalAchievements = document.getElementById('modal-achievements');
    
    if (!modal) {
        console.error('Modal não encontrado no DOM');
        return;
    }
    
    if (!modalName || !modalPeriod || !modalPosition || !modalAchievements) {
        console.error('Elementos do modal não encontrados');
        return;
    }
    
    // Preencher dados do modal
    modalName.textContent = company.name;
    modalPeriod.textContent = company.period;
    modalPosition.textContent = company.position;
    
    // Limpar e preencher achievements
    modalAchievements.innerHTML = '';
    company.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        modalAchievements.appendChild(li);
    });
    
    // Mostrar modal
    modal.style.display = 'block';
    // Pequeno delay para permitir a transição CSS
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
    
    console.log('Modal aberto para:', company.name);
}

// Função para fechar o modal
function closeCompanyModal() {
    console.log('Fechando modal');
    
    const modal = document.getElementById('company-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Aguarda a animação terminar
        document.body.style.overflow = 'auto';
    }
}

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando funcionalidades...');
    
    // Inicializar modais das empresas
    const companyItems = document.querySelectorAll('.company-item.clickable');
    console.log('Elementos .company-item.clickable encontrados:', companyItems.length);
    
    companyItems.forEach((item, index) => {
        const companyKey = item.getAttribute('data-company');
        console.log(`Configurando empresa ${index + 1}: ${companyKey}`);
        
        if (companyKey) {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                console.log('Clique detectado em:', companyKey);
                openCompanyModal(companyKey);
            });
            
            // Adiciona estilo de cursor pointer
            item.style.cursor = 'pointer';
            console.log(`Listener adicionado para: ${companyKey}`);
        } else {
            console.warn('Elemento sem data-company:', item);
        }
    });
    
    // Event listener para fechar modal no botão X
    const closeButton = document.querySelector('.close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            closeCompanyModal();
        });
        console.log('Listener do botão fechar adicionado');
    } else {
        console.warn('Botão .close-modal não encontrado');
    }
    
    // Fechar modal clicando fora dele
    const modal = document.getElementById('company-modal');
    if (modal) {
        modal.addEventListener('click', function(event) {
            // Verifica se o clique foi no próprio modal (background) e não no conteúdo
            if (event.target === modal) {
                closeCompanyModal();
            }
        });
        console.log('Listener para fechar modal ao clicar fora adicionado');
    }
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCompanyModal();
        }
    });
    
    console.log('Funcionalidades do modal inicializadas');
    
    // Inicializar outras funcionalidades
    initScrollAnimations();
    initCounterAnimations();
    initSmoothScrolling();
    initMobileMenu();
    initHeaderScroll();
    
    console.log('Portfolio carregado com sucesso! 🚀');
});

// Animações de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.about-card, .project-card, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animação de contadores
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.parentElement.querySelector('.stat-label').textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.parentElement.querySelector('.stat-label').textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
    
    element.style.animation = 'countUp 0.6s ease-out';
}

// Scroll suave para links internos
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Menu mobile
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Header com scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }
        
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}
