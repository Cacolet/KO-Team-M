import {defineStore} from "pinia";
import {TabPaneProps} from "element-plus"
import {TabsState} from "../interface"
import {HOME_URL, TABS_BLACK_LIST} from "@/config/config";
import router from "@/routers/index";

export const TabsStore = defineStore({
    id: "TabsState",
    state: (): TabsState => ({
        tabsMenuList: [{title: "首页", path: HOME_URL, icon: "home-filled", close: false}],
        tabsMenuValue: HOME_URL
    }),
    getters: {},
    actions: {
        // Add Tabs
        async addTabs(tabItem: Menu.MenuOptions) {
            // not add tabs black list
            if (TABS_BLACK_LIST.includes(tabItem.path)) return;
            const tabInfo: Menu.MenuOptions = {
                title: tabItem.title,
                path: tabItem.path,
                close: tabItem.close
            };
            if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
                this.tabsMenuList.push(tabInfo)
            }
            this.setTabsMenuValue(tabItem.path)
            router.push(tabItem.path)
        },

        // Remove Tabs
        async removeTabs(tabPath: string) {
            let tabsMenuValue = this.tabsMenuValue;
            const tabsMenuList = this.tabsMenuList;
            if (tabsMenuValue === tabPath) {
                tabsMenuList.forEach((item, index) => {
                    if (item.path !== tabPath) return;
                    const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
                    if (!nextTab) return;
                    tabsMenuValue = nextTab.path
                    router.push(nextTab.path)
                })
            }
            this.tabsMenuValue = tabsMenuValue;
            this.tabsMenuList = tabsMenuList.filter(item => item.path !== tabPath)
        },

        // Set TabsMenuList
        async setTabsMenuList(tabsMenuValue: string) {
            this.tabsMenuValue = tabsMenuValue
        },

        // Set TabsMenuValue
        async setTabsMenuValue(tabsMenuValue: string) {
            this.tabsMenuValue = tabsMenuValue
        },

        // Close MultipleTab
        async closeMultipleTab(tabsMenuValue?: string){
            this.tabsMenuList = this.tabsMenuList.filter(item => {
                return item.path === tabsMenuValue || item.path === HOME_URL
            })
        }
    }
})