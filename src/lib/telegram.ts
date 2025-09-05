import WebApp from '@twa-dev/sdk'

// Initialize Telegram Web App
export const initTelegram = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp
    
    // Configure app
    tg.ready()
    tg.expand()
    tg.enableClosingConfirmation()
    
    // Set theme
    tg.setHeaderColor('#1a1a2e')
    tg.setBackgroundColor('#16213e')
    
    return tg
  }
  
  return null
}

// Get Telegram user data
export const getTelegramUser = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return window.Telegram.WebApp.initDataUnsafe.user
  }
  return null
}

// Show back button
export const showBackButton = (callback: () => void) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp
    tg.BackButton.show()
    tg.BackButton.onClick(callback)
  }
}

// Hide back button
export const hideBackButton = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.BackButton.hide()
  }
}

// Send data to bot
export const sendDataToBotFrontend = (data: any) => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify(data))
  }
}

// Haptic feedback
export const hapticFeedback = (type: 'impact' | 'notification' | 'selection' = 'impact') => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
    const haptic = window.Telegram.WebApp.HapticFeedback
    
    switch (type) {
      case 'impact':
        haptic.impactOccurred('medium')
        break
      case 'notification':
        haptic.notificationOccurred('success')
        break
      case 'selection':
        haptic.selectionChanged()
        break
    }
  }
}

// Close app
export const closeApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.close()
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: any
    }
  }
}