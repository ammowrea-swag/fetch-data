import dogs from '$lib/data/dogs.json';

export function load() {
  return {
    // Set to false to hide the NYCity News Service header
    showHeader: true,
    // Set to false to hide the site footer
    showFooter: true,
    dogs
  };
}
