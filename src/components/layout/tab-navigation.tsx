import { cn } from "@/lib/utils"

// Компонент для иконки Меню
const MenuIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="33" height="33" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd" clip-rule="evenodd"
      d="M17 0C7.61116 0 0 7.61116 0 17V25C0 34.3888 7.61116 42 17 42H25C34.3888 42 42 34.3888 42 25V17C42 7.61116 34.3888 0 25 0H17ZM16.8262 25.7455C16.3135 21.8192 16.2932 19.1889 16.8185 15.2665C16.9048 14.6224 17.5809 14.2399 18.1747 14.504C21.489 15.978 23.5205 17.3821 26.2675 20.0394C26.6718 20.4304 26.6637 21.0815 26.2477 21.4599C23.5917 23.8756 21.5319 25.1195 18.1722 26.5235C17.5765 26.7725 16.9098 26.3858 16.8262 25.7455Z"
      fill={isActive ? "#4995FF" : "#B9C6CF"}
      fillOpacity={isActive ? "1" : "1"}
    />
    <path
      fill-rule="evenodd" clip-rule="evenodd"
      d="M17 0C7.61116 0 0 7.61116 0 17V25C0 34.3888 7.61116 42 17 42H25C34.3888 42 42 34.3888 42 25V17C42 7.61116 34.3888 0 25 0H17ZM16.8262 25.7455C16.3135 21.8192 16.2932 19.1889 16.8185 15.2665C16.9048 14.6224 17.5809 14.2399 18.1747 14.504C21.489 15.978 23.5205 17.3821 26.2675 20.0394C26.6718 20.4304 26.6637 21.0815 26.2477 21.4599C23.5917 23.8756 21.5319 25.1195 18.1722 26.5235C17.5765 26.7725 16.9098 26.3858 16.8262 25.7455Z"
      fill={isActive ? "#4995FF" : "#B9C6CF"}
    />
  </svg>
);

// Компонент для иконки Поиска
const SearchIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="34" height="32" viewBox="0 0 42 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.5 27C7.01472 27 5 29.0147 5 31.5V31.5C5 33.9853 7.01472 36 9.5 36H31.5C33.9853 36 36 33.9853 36 31.5V31.5C36 29.0147 33.9853 27 31.5 27H9.5Z"
      fill={isActive ? "#4995FF" : "#B9C6CF"}
      fillOpacity={isActive ? "1" : "1"}
    />
    <path
      d="M0 5C0 2.23858 2.23858 0 5 0H37C39.7614 0 42 2.23858 42 5V18C42 20.7614 39.7614 23 37 23H5C2.23858 23 0 20.7614 0 18V5Z"
      fill={isActive ? "#4995FF" : "#B9C6CF"}
    />
  </svg>
);

// Компонент для иконки Достижений
const AchievementsIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="26" height="32" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd" clip-rule="evenodd"
      d="M27 33.5V36H30.25V33.5H27Z"
      fill={isActive ? "#4995FF" : "#B9C6CF"}
      fillOpacity={isActive ? "1" : "1"}
    />
    <path
      fill-rule="evenodd" clip-rule="evenodd"
      d="M5 39.5C2.23858 39.5 0 37.2614 0 34.5V5C0 2.23858 2.23858 0 5 0H27.5C30.2614 0 32.5 2.23858 32.5 5V31.25C32.5 32.4926 31.4926 33.5 30.25 33.5H27H5.25C4.55964 33.5 4 34.0596 4 34.75C4 35.4404 4.55964 36 5.25 36H27H30.25H30.75C31.7165 36 32.5 36.7835 32.5 37.75C32.5 38.7165 31.7165 39.5 30.75 39.5H5ZM18.7465 12.2899L17.2633 9.9732C16.6732 9.05157 15.3268 9.05157 14.7367 9.9732L13.2535 12.2899C13.0501 12.6077 12.7342 12.8371 12.3691 12.9325L9.70749 13.6271C8.64863 13.9035 8.23255 15.1841 8.92674 16.0301L10.6717 18.1565C10.9111 18.4483 11.0317 18.8195 11.0095 19.1963L10.8477 21.9423C10.7834 23.0347 11.8727 23.8261 12.8918 23.4273L15.4534 22.4249C15.8048 22.2874 16.1952 22.2874 16.5466 22.4249L19.1082 23.4273C20.1273 23.8261 21.2166 23.0347 21.1523 21.9423L20.9905 19.1963C20.9683 18.8195 21.0889 18.4483 21.3283 18.1565L23.0733 16.0301C23.7674 15.1841 23.3514 13.9035 22.2925 13.6271L19.6309 12.9325C19.2658 12.8371 18.9499 12.6077 18.7465 12.2899Z"
      fill={isActive ? "#4995FF" : "#B9C6CF"}
    />
  </svg>
);

// Компонент для иконки Профиля
const ProfileIcon = ({ isActive }: { isActive: boolean }) => (
  <svg width="34" height="32" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.8225 36C1.44303 36 -0.936838 32.6522 1.09986 29.9554C9.45079 18.8979 28.1718 18.6545 36.7811 29.8859C38.8574 32.5945 36.4758 36 33.063 36H4.8225Z"
      fill={isActive ? "#4995FF" : "#B9C6CF"}
      fillOpacity={isActive ? "1" : "1"}
    />
    <path
      d="M28.0002 9C28.0002 13.9706 23.9707 18 19.0002 18C14.0296 18 10.0002 13.9706 10.0002 9C10.0002 4.02944 14.0296 0 19.0002 0C23.9707 0 28.0002 4.02944 28.0002 9Z"
      fill={isActive ? "#4995FF" : "#B9C6CF"}
    />
  </svg>
);


interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'main', icon: MenuIcon },
  { id: 'theory', icon: SearchIcon },
  { id: 'achievements', icon: AchievementsIcon },
  { id: 'profile', icon: ProfileIcon },
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-[2rem]">
      <div className="flex items-center justify-around px-4 py-6 max-w-md mx-auto">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center rounded-lg transition-all duration-300",
              "hover:bg-primary/0 -mt-1",
              activeTab === id 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            <Icon isActive={activeTab === id} />
          </button>
        ))}
      </div>
    </nav>
  )
}