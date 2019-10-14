const animationSettings = '.2s ease-in-out';

export function animate(properties: string[], settings = animationSettings): string {
    return properties.map(prop => `${prop} ${settings}`).join(', ');
}
