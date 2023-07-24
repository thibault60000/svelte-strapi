import { describe, test, expect } from 'vitest';
import Seach from '../modals/Search.svelte';

describe('Seach Component', () => {
	test('should render the component', () => {
		// Create a new container for the test
		const host = document.createElement('div');

		// Append the new container in the HTML body
		document.body.appendChild(host);

		// Create an instance of the vertical tab
		const instance = new Seach({ target: host });

		// Check if the instance has value
		expect(instance).toBeTruthy();

		// Test if we can find the footer elements
		expect(host.textContent).toContain('Esc to close');
		expect(host.textContent).toContain('Tab to navigate');
		expect(host.textContent).toContain('Enter to select');
	});
});

// host: HTMLDivElement

/*
    Méthodes pour la manipulation du contenu :

        innerHTML: Récupère ou définit le contenu HTML à l'intérieur de l'élément <div>.
        textContent: Récupère ou définit le contenu texte à l'intérieur de l'élément <div>.
        appendChild(): Ajoute un nœud fils à l'élément <div>.
        removeChild(): Supprime un nœud fils de l'élément <div>.
        replaceChild(): Remplace un nœud fils de l'élément <div> par un autre nœud.

    Méthodes pour le style et les attributs :

        getAttribute(): Récupère la valeur d'un attribut spécifique de l'élément <div>.
        setAttribute(): Définit ou modifie la valeur d'un attribut de l'élément <div>.
        classList.add(): Ajoute une classe CSS à l'élément <div>.
        classList.remove(): Supprime une classe CSS de l'élément <div>.
        style.setProperty(): Définit une propriété CSS sur l'élément <div>.
        style.removeProperty(): Supprime une propriété CSS de l'élément <div>.

    Méthodes pour la gestion des événements :

        addEventListener(): Attache un écouteur d'événements à l'élément <div>.
        removeEventListener(): Supprime un écouteur d'événements de l'élément <div>.
*/

/// Attendez que le composant se mette à jour (s'il y a des opérations asynchrones)
// await component.$$.ctx.$update();
