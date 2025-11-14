// src/scripts/modal-logic.js

export function initializeModalLogic(allModalImages) {
    
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const TOTAL_MODAL_IMAGES = allModalImages.length;
    const VARIANT_TERTIARY = 'tertiary';
    const VARIANT_DISABLED = 'disabled';
    let isModalOpen = false;

    // Cette fonction sera appelée par les boutons de la modale
    window.navigateModal = function(direction) {
        if (!modalImg || TOTAL_MODAL_IMAGES === 0 || !isModalOpen) return;

        let currentIndex = parseInt(modalImg.dataset.currentModalIndex) || 0;
        
        let newIndex = currentIndex + direction;

        if (newIndex < 0 || newIndex >= TOTAL_MODAL_IMAGES) {
            return;
        }
        
        modalImg.src = allModalImages[newIndex];
        modalImg.dataset.currentModalIndex = newIndex.toString();
        
        updateModalArrows(newIndex);
    };

    function updateModalArrows(index) {
    const prevBtn = document.getElementById('modalPrevBtn');
    const nextBtn = document.getElementById('modalNextBtn');
    
    if (!prevBtn || !nextBtn || TOTAL_MODAL_IMAGES <= 1) {
      // Utilisation de .style.display pour cacher complètement si <= 1 image
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    } else {
             if (prevBtn) prevBtn.style.display = '';
             if (nextBtn) nextBtn.style.display = '';
    }

    // Flèche Précédente : Désactivée sur la première image (index 0)
    const isPrevDisabled = index <= 0;
    prevBtn.setAttribute('disabled', isPrevDisabled ? 'true' : 'false');
    prevBtn.setAttribute('variant', isPrevDisabled ? VARIANT_DISABLED : VARIANT_TERTIARY);
    
    // Flèche Suivante : Désactivée sur la dernière image (index N-1)
    const isNextDisabled = index >= TOTAL_MODAL_IMAGES - 1;
    nextBtn.setAttribute('disabled', isNextDisabled ? 'true' : 'false');
    nextBtn.setAttribute('variant', isNextDisabled ? VARIANT_DISABLED : VARIANT_TERTIARY);
  }

    // Rendre la fonction show/hide globale (appelée par onclick dans l'HTML)
  window.showImageModal = function(imageUrl) {
    if (!modal || !modalImg || !imageUrl || isModalOpen) return;

    const initialIndex = allModalImages.indexOf(imageUrl);
    
    let initialModalIndex = (initialIndex === -1) ? 0 : initialIndex;
    
    modalImg.dataset.currentModalIndex = initialModalIndex.toString();
    modalImg.src = imageUrl;
    
    updateModalArrows(initialModalIndex);
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
        isModalOpen = true;
  };
  
  window.hideImageModal = function() {
    if (modal && isModalOpen) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
            isModalOpen = false;
    }
  };

    // Gestion des touches du clavier
  document.addEventListener('keydown', (event) => {
    if (isModalOpen) {
      if (event.key === 'Escape') {
        window.hideImageModal();
      } else if (event.key === 'ArrowLeft') {
        window.navigateModal(-1);
      } else if (event.key === 'ArrowRight') {
        window.navigateModal(1);
      }
    }
  });
    
    // Initialisation du DOM (masquer la modale au départ)
    if (modal) {
        modal.classList.add('hidden');
    }
}