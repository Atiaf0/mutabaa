/* ============================================
   EXACT MUTABA'A DASHBOARD JAVASCRIPT
   ============================================ */

// ============================================
// MODAL FUNCTIONS
// ============================================

/**
 * Opens the details modal with provided content
 * @param {string} title - Modal title
 * @param {string} description - Modal body content
 */
function openDetails(title, description) {
    const modal = document.getElementById('detailsModal');
    const modalHeader = modal.querySelector('.modal-header h2');
    const modalBody = modal.querySelector('.modal-body');

    // Set content
    modalHeader.textContent = title;
    modalBody.innerHTML = description;

    // Show modal
    modal.classList.add('show');

    // Trigger animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'none';
    setTimeout(() => {
        modalContent.style.animation = 'slideIn 0.3s ease';
    }, 10);
}

/**
 * Opens the beneficiary details modal
 * @param {string} name - Beneficiary name
 * @param {string} date - Last update date
 * @param {string} status - Current status
 * @param {string} region - Region information
 */
function openBeneficiaryDetails(name, date, status, region) {
    const detailsHTML = `
        <div class="detail-item">
            <div class="detail-label">الاسم</div>
            <div class="detail-value">${name}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">آخر تحديث</div>
            <div class="detail-value">${date}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">الحالة</div>
            <div class="detail-value">
                <span class="status-badge status-${status.toLowerCase()}">${status}</span>
            </div>
        </div>
        <div class="detail-item">
            <div class="detail-label">المنطقة</div>
            <div class="detail-value">${region}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">ملاحظات</div>
            <div class="detail-value">
                جاري متابعة الحالة بشكل دوري. آخر تقرير يشير إلى تحسن في الوضع الصحي للمستفيد.
            </div>
        </div>
    `;

    openDetails(name, detailsHTML);
}

/**
 * Closes the modal
 */
function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.classList.remove('show');
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeModal();
    initializeInteractions();
    initializeSearch();
    initializeNotifications();
});

/**
 * Initialize modal close functionality
 */
function initializeModal() {
    const modal = document.getElementById('detailsModal');
    const closeBtn = modal.querySelector('.modal-close');
    const closeModalBtn = modal.querySelector('.btn-modal-close');

    // Close on X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on Close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close on background click
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

/**
 * Initialize sidebar navigation and interactions
 */
function initializeInteractions() {
    // Navigation links -> use data-view attribute to switch views
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const view = this.getAttribute('data-view');
            if (view) {
                navigateTo(view);
            } else {
                // Fallback: toggle active class
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Expose navigateTo globally if needed
    window.navigateTo = navigateTo;

    // Task cards
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            const icon = this.querySelector('.task-icon').textContent;

            let detailContent = '';
            
            if (index === 0) { // إدارة المتطوعين
                detailContent = `
                    <div class="detail-item">
                        <div class="detail-label">عدد المتطوعين النشطين</div>
                        <div class="detail-value">76 متطوع</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">متطوعون جدد هذا الشهر</div>
                        <div class="detail-value">12 متطوع</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">الساعات المتطوع بها</div>
                        <div class="detail-value">486 ساعة</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">الإجراء</div>
                        <div class="detail-value">تصفية وفرز وإدارة قائمة المتطوعين</div>
                    </div>
                `;
            } else if (index === 1) { // إدارة المستفيدين
                detailContent = `
                    <div class="detail-item">
                        <div class="detail-label">إجمالي المستفيدين</div>
                        <div class="detail-value">1,250 مستفيد</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">مستفيدين جدد هذا الشهر</div>
                        <div class="detail-value">84 مستفيد</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">الحالات المعقدة</div>
                        <div class="detail-value">23 حالة</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">الإجراء</div>
                        <div class="detail-value">إضافة ومتابعة وتحديث بيانات المستفيدين</div>
                    </div>
                `;
            } else if (index === 2) { // التقارير
                detailContent = `
                    <div class="detail-item">
                        <div class="detail-label">التقارير المعلقة</div>
                        <div class="detail-value">48 تقرير</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">التقارير المكتملة</div>
                        <div class="detail-value">342 تقرير</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">معدل الامتثال</div>
                        <div class="detail-value">87.6%</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">الإجراء</div>
                        <div class="detail-value">عرض وتصدير وتحليل التقارير</div>
                    </div>
                `;
            } else { // الإعدادات
                detailContent = `
                    <div class="detail-item">
                        <div class="detail-label">إدارة المستخدمين</div>
                        <div class="detail-value">تعديل أدوار وصلاحيات المستخدمين</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">إعدادات الجودة</div>
                        <div class="detail-value">تحديد معايير الجودة والمتابعة</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">إعدادات النظام</div>
                        <div class="detail-value">تكوين إعدادات النظام العامة</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">النسخ الاحتياطية</div>
                        <div class="detail-value">إدارة النسخ الاحتياطية والاستعادة</div>
                    </div>
                `;
            }

            openDetails(title, detailContent);
        });
    });

    // Rank items
    const rankItems = document.querySelectorAll('.rank-item');
    rankItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.querySelector('.rank-name').textContent;
            const status = this.querySelector('.rank-status').textContent;
            const rankNum = this.querySelector('.rank-number').textContent;

            const detailContent = `
                <div class="detail-item">
                    <div class="detail-label">الترتيب</div>
                    <div class="detail-value">#${rankNum}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">الاسم</div>
                    <div class="detail-value">${name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">الحالة</div>
                    <div class="detail-value">${status}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">ساعات التطوع</div>
                    <div class="detail-value">${rankNum === '1' ? '156 ساعة' : rankNum === '2' ? '142 ساعة' : rankNum === '3' ? '128 ساعة' : '115 ساعة'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">الحالات المتابعة</div>
                    <div class="detail-value">${rankNum === '1' ? '34 حالة' : rankNum === '2' ? '28 حالة' : rankNum === '3' ? '21 حالة' : '19 حالة'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">معدل التقييم</div>
                    <div class="detail-value">4.8 / 5.0</div>
                </div>
            `;

            openDetails(name, detailContent);
        });
    });

    // Stat boxes
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach((box, index) => {
        box.addEventListener('click', function() {
            const title = this.querySelector('.stat-info h4').textContent;
            const number = this.querySelector('.stat-number').textContent;

            let detailContent = '';

            if (index === 0) { // عدد المستفيدين
                detailContent = `
                    <div class="detail-item">
                        <div class="detail-label">إجمالي المستفيدين</div>
                        <div class="detail-value">${number}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">مستفيدين نشطين</div>
                        <div class="detail-value">1,180</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">متابعة إجمالية</div>
                        <div class="detail-value">943 حالة</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">حالات معقدة</div>
                        <div class="detail-value">23 حالة</div>
                    </div>
                `;
            } else if (index === 1) { // التحديثات المعلقة
                detailContent = `
                    <div class="detail-item">
                        <div class="detail-label">التحديثات المعلقة</div>
                        <div class="detail-value">${number}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">تحديثات متأخرة</div>
                        <div class="detail-value">12 تحديث</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">متوسط وقت المعالجة</div>
                        <div class="detail-value">2.3 أيام</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">الأولوية</div>
                        <div class="detail-value">معالجة التحديثات المتأخرة بأولوية</div>
                    </div>
                `;
            } else { // المتطوعون النشطون
                detailContent = `
                    <div class="detail-item">
                        <div class="detail-label">المتطوعون النشطون</div>
                        <div class="detail-value">${number}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">متطوعون جدد هذا الشهر</div>
                        <div class="detail-value">12</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">إجمالي ساعات التطوع</div>
                        <div class="detail-value">486 ساعة</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">متوسط الساعات</div>
                        <div class="detail-value">6.4 ساعات / متطوع</div>
                    </div>
                `;
            }

            openDetails(title, detailContent);
        });
    });

    // Beneficiaries search/filter
    const benSearch = document.getElementById('beneficiary-search');
    const benClear = document.getElementById('beneficiary-clear');
    const benRegion = document.getElementById('beneficiary-filter-region');
    if (benSearch) {
        benSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterBeneficiaries(this.value, benRegion ? benRegion.value : '');
            }
        });
    }
    if (benClear) {
        benClear.addEventListener('click', function() {
            if (benSearch) benSearch.value = '';
            if (benRegion) benRegion.value = '';
            filterBeneficiaries('', '');
        });
    }

    if (benRegion) {
        benRegion.addEventListener('change', function() {
            filterBeneficiaries(benSearch ? benSearch.value : '', this.value);
        });
    }

    // Volunteers search/filter
    const volSearch = document.getElementById('vol-search');
    const volFilterBtn = document.getElementById('vol-filter-btn');
    if (volFilterBtn) {
        volFilterBtn.addEventListener('click', function() {
            const q = volSearch ? volSearch.value.trim() : '';
            filterVolunteers(q);
        });
    }

    // Reports export (delegated)
    document.addEventListener('click', function(e) {
        const t = e.target;
        if (t && t.classList && t.classList.contains('export-btn')) {
            const id = t.getAttribute('data-report-id') || 'unknown';
            handleExport(id);
        }
    });

    // Messages: preview and open
    const messageRows = document.querySelectorAll('.message-row');
    messageRows.forEach(row => {
        row.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject') || 'بدون عنوان';
            const body = this.getAttribute('data-body') || '';
            const from = this.getAttribute('data-from') || '';

            // show preview
            const preview = document.getElementById('message-preview');
            if (preview) {
                preview.innerHTML = `<h3>${subject}</h3><p style="color:#6B6B6B;margin-bottom:0.5rem;">من: ${from}</p><div style="white-space:pre-wrap;">${body}</div><div style="margin-top:1rem;"><button class=\"btn-modal-close\" onclick=\"openDetails('${subject}','${escapeHtml(body)}')\">عرض في نافذة</button></div>`;
            }
        });
    });
}

/**
 * Show the requested view and hide others
 * @param {string} view - view id without prefix (e.g. 'overview')
 */
function navigateTo(view) {
    const allViews = document.querySelectorAll('.view');
    allViews.forEach(v => v.classList.remove('active'));

    const target = document.getElementById('view-' + view);
    if (target) {
        target.classList.add('active');
    } else {
        console.warn('View not found:', view);
    }

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => {
        if (l.getAttribute('data-view') === view) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });

    // Scroll to top of main content for better UX
    const main = document.querySelector('.main-content');
    if (main) main.scrollTop = 0;
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                console.log('Searching for: ' + query);
                performSearch(query);
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    console.log('Searching for: ' + query);
                    performSearch(query);
                }
            }
        });
    }
}

/**
 * Perform search operation
 * @param {string} query - Search query
 */
function performSearch(query) {
    // Highlight matching rows in table
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            row.style.backgroundColor = '#f0f8ff';
        } else {
            row.style.backgroundColor = '';
        }
    });

    // Also highlight matching beneficiary names in other sections
    console.log('Search results for: ' + query);
}

/**
 * Initialize notifications
 */
function initializeNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            openDetails('الإشعارات', `
                <div class="detail-item">
                    <div class="detail-label">تحديث جديد متاح</div>
                    <div class="detail-value">2024-01-15 10:30</div>
                    <p style="color: #6B6B6B; margin-top: 0.5rem;">تم استلام تقرير جديد من متطوع أحمد</p>
                </div>
                <div class="detail-item">
                    <div class="detail-label">حالة معقدة تحتاج متابعة</div>
                    <div class="detail-value">2024-01-14 15:45</div>
                    <p style="color: #6B6B6B; margin-top: 0.5rem;">حالة المستفيد محمد أحمد تحتاج متابعة عاجلة</p>
                </div>
                <div class="detail-item">
                    <div class="detail-label">متطوع جديد انضم</div>
                    <div class="detail-value">2024-01-14 09:20</div>
                    <p style="color: #6B6B6B; margin-top: 0.5rem;">المتطوع فاطمة علي انضمت إلى البرنامج</p>
                </div>
                <div class="detail-item">
                    <div class="detail-label">تقرير متأخر</div>
                    <div class="detail-value">2024-01-13 14:00</div>
                    <p style="color: #6B6B6B; margin-top: 0.5rem;">التقرير المتعلق بالمستفيد سارة متأخر</p>
                </div>
            `);
        });
    }
}

// ============================================
// ANIMATIONS
// ============================================

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format date to Arabic format
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
function formatDateArabic(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('ar-SA', options).format(date);
}

/**
 * Format number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Escape HTML for safe insertion
 */
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[&<"'>]/g, function(m) {
        switch (m) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
            default: return m;
        }
    });
}

/**
 * Filter beneficiaries table by query and region
 */
function filterBeneficiaries(query, region) {
    const tbody = document.getElementById('beneficiaries-tbody');
    if (!tbody) return;
    const rows = tbody.querySelectorAll('tr');
    const q = (query || '').toLowerCase();
    const r = (region || '').toLowerCase();
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matchesQ = q === '' || text.includes(q);
        const matchesR = r === '' || text.includes(r);
        row.style.display = (matchesQ && matchesR) ? '' : 'none';
    });
}

/**
 * Simple volunteer filter (client-side)
 */
function filterVolunteers(query) {
    const rows = document.querySelectorAll('#view-volunteers .data-table tbody tr');
    const q = (query || '').toLowerCase();
    rows.forEach(r => {
        r.style.display = q === '' || r.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
}

/**
 * Handle export button click
 */
function handleExport(reportId) {
    openDetails('تصدير تقرير', `جاري تحضير ملف التصدير للتقرير: <strong>${reportId}</strong>. يمكنك تحميل الملف بعد الانتهاء.`);
    console.log('Export requested for', reportId);
}

// ============================================
// PAGE LOAD EFFECTS
// ============================================

// Add fade-in effect to cards on page load
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.card, .stat-box, .task-card, .rank-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});
