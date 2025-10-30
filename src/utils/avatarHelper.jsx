// src/utils/avatarHelper.js

/**
 * Generate a beautiful avatar URL from user's name
 * Uses UI Avatars service to create circular avatars with initials
 * 
 * @param {string} name - Full name of the user
 * @param {number} size - Size of the avatar in pixels (default: 128)
 * @param {string} background - Background color (default: 'ec4899' - pink)
 * @param {string} color - Text color (default: 'fff' - white)
 * @returns {string} Avatar URL
 */
export const getAvatarUrl = (name, size = 128, background = 'ec4899', color = 'fff') => {
  // If no name provided, return default avatar
  if (!name || name.trim() === '') {
    return `https://ui-avatars.com/api/?name=User&background=${background}&color=${color}&size=${size}&bold=true&rounded=true`;
  }
  
  // Extract initials from name (first letter of first and last name)
  const initials = name
    .trim()
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2); // Max 2 letters
  
  // Return UI Avatars URL
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${background}&color=${color}&size=${size}&bold=true&rounded=true`;
};

/**
 * Generate a colorful avatar with random background color
 * Perfect for child profiles or diverse user avatars
 * 
 * @param {string} name - Full name
 * @param {number} size - Size in pixels
 * @returns {string} Avatar URL
 */
export const getColorfulAvatar = (name, size = 128) => {
  // Array of beautiful colors
  const colors = [
    'ec4899', // Pink
    'a855f7', // Purple
    '3b82f6', // Blue
    '10b981', // Green
    'f59e0b', // Amber
    'ef4444', // Red
    '06b6d4', // Cyan
    '8b5cf6', // Violet
  ];
  
  // Generate a consistent color based on name (same name = same color)
  const colorIndex = name ? name.length % colors.length : 0;
  const backgroundColor = colors[colorIndex];
  
  return getAvatarUrl(name, size, backgroundColor, 'fff');
};

/**
 * Get avatar URL with fallback
 * If user has uploaded photo, use it; otherwise generate avatar
 * 
 * @param {object} user - User object with photoURL and fullName
 * @param {number} size - Size in pixels
 * @returns {string} Avatar URL
 */
export const getUserAvatar = (user, size = 128) => {
  // If user has uploaded a custom photo, use it
  if (user?.photoURL && user.photoURL.trim() !== '') {
    return user.photoURL;
  }
  
  // Otherwise, generate avatar from name
  return getAvatarUrl(user?.fullName || user?.displayName || user?.email || 'User', size);
};

/**
 * Get child avatar URL
 * Uses colorful avatars for children
 * 
 * @param {object} child - Child object with name and optional photoURL
 * @param {number} size - Size in pixels
 * @returns {string} Avatar URL
 */
export const getChildAvatar = (child, size = 128) => {
  // If child has uploaded photo, use it
  if (child?.photoURL && child.photoURL.trim() !== '') {
    return child.photoURL;
  }
  
  // Otherwise, generate colorful avatar from name
  return getColorfulAvatar(child?.name || 'Baby', size);
};

/**
 * Generate avatar for any entity (user, child, doctor, etc.)
 * Universal avatar function
 * 
 * @param {string} name - Name of the entity
 * @param {string} photoURL - Optional custom photo URL
 * @param {number} size - Size in pixels
 * @param {string} type - Type: 'user', 'child', 'doctor' (affects color)
 * @returns {string} Avatar URL
 */
export const getAvatar = (name, photoURL = null, size = 128, type = 'user') => {
  // If custom photo exists, use it
  if (photoURL && photoURL.trim() !== '') {
    return photoURL;
  }
  
  // Color schemes based on type
  const colorSchemes = {
    user: 'ec4899',    // Pink
    child: '10b981',   // Green
    doctor: '3b82f6',  // Blue
    admin: 'ef4444',   // Red
  };
  
  const backgroundColor = colorSchemes[type] || 'ec4899';
  
  return getAvatarUrl(name, size, backgroundColor, 'fff');
};

export default {
  getAvatarUrl,
  getColorfulAvatar,
  getUserAvatar,
  getChildAvatar,
  getAvatar
};