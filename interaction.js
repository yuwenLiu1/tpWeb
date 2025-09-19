
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
  this.startX = 0;
  this.startY = 0;
  this.endX = 0;
  this.endY = 0
	// Developper les 3 fonctions gérant les événements
  this.isDragging = false;
  this.canvas = canvas;
  this.interactor = interactor;

  // Gestionnaire d'événement pour le clic de souris
  this.mouseDown = function(evt) {
      const pos = getMousePosition(canvas, evt);
      this.startX = this.endX = pos.x;
      this.startY = this.endY = pos.y;
      this.isDragging = true;
      this.interactor.onInteractionStart(this); // Notification du début
      console.log(`Début du DnD - Coordonnées: (${this.startX}, ${this.startY})`); // Affichage des coordonnées
  }.bind(this);

  // Gestionnaire d'événement pour le déplacement de souris
  this.mouseMove = function(evt) {
      if (this.isDragging) {
          const pos = getMousePosition(canvas, evt);
          this.endX = pos.x;
          this.endY = pos.y;
          this.interactor.onInteractionUpdate(this); // Notification de la mise à jour
          console.log(`Déplacement - Coordonnées: (${this.endX}, ${this.endY})`); // Affichage des coordonnées
      }
  }.bind(this);

  // Gestionnaire d'événement pour le relâchement de souris
  this.mouseUp = function(evt) {
      if (this.isDragging) {
          const pos = getMousePosition(canvas, evt);
          this.endX = pos.x;
          this.endY = pos.y;
          this.isDragging = false;
          this.interactor.onInteractionEnd(this); // Notification de la fin
          console.log(`Fin du DnD - Coordonnées: (${this.endX}, ${this.endY})`); // Affichage des coordonnées
      }
  }.bind(this);

	// Associer les fonctions précédentes aux évènements du canvas.
  canvas.addEventListener('mousedown', this.mouseDown, false);
  canvas.addEventListener('mousemove', this.mouseMove, false);
  canvas.addEventListener('mouseup', this.mouseUp, false);

};


// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};



