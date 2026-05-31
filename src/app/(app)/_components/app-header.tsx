'use client';

import LanguageDropdown from "@/app/(app)/_components/topbar/dropdown-language";
import ProfileDropdown from "@/app/(app)/_components/topbar/dropdown-profile";
import NotificationDropdown from "@/app/(app)/_components/topbar/notification-dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellRing, Globe } from "lucide-react";

const AppHeader = () => {
  return (
    <div className="flex w-full">
      <div className="flex flex-1 flex-col">
        <header className="bg-card sticky top-0 z-50 border-b">
          <div className="mx-auto flex max-w-[90dvw] items-center justify-between gap-6 px-4 py-2 sm:px-6">
            <div className="flex items-center gap-4">
              <a href="#">
                <img
                  src="https://images.shadcnspace.com/assets/logo/shadcnspace.svg"
                  alt="logo"
                  className="dark:hidden h-10"
                />
                <img
                  src="https://images.shadcnspace.com/assets/logo/shadcnspace-white.svg"
                  alt="logo"
                  className="hidden dark:block h-10"
                />
              </a>
              <Separator orientation="vertical" />
              <SidebarTrigger />
              {/* <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-xs gap-4">
                        <li>
                          <NavigationMenuLink href="#">
                            <div className="flex flex-col items-start gap-0.5!">
                              <p className="font-medium">Components</p>
                              <p className="text-muted-foreground">
                                Browse all components in the library.
                              </p>
                            </div>
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#">
                            <div className="flex flex-col items-start gap-0.5!">
                              <p className="font-medium">Documentation</p>
                              <p className="text-muted-foreground">
                                Learn how to use the library.
                              </p>
                            </div>
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#">
                            <div className="flex flex-col items-start gap-0.5!">
                              <p className="font-medium">Blog</p>
                              <p className="text-muted-foreground">
                                Read our latest blog posts.
                              </p>
                            </div>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu> */}
            </div>
            <div className="flex items-center gap-2.5">
              <NotificationDropdown
                defaultOpen={false}
                align="center"
                trigger={
                  <div className="rounded-full p-2 hover:bg-accent relative before:absolute before:bottom-0 before:left-1/2 before:z-10 before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:top-1">
                    <BellRing className="size-4" />
                  </div>
                }
              />
              <LanguageDropdown
                trigger={
                  <div
                    id="language-dropdown-trigger"
                    className="rounded-full hover:bg-accent/80 cursor-pointer p-2"
                  >
                    <Globe size={16} />
                  </div>
                }
              />
              <ProfileDropdown
                trigger={
                  <div
                    id="profile-dropdown-trigger"
                    className="rounded-full cursor-pointer"
                  >
                    <Avatar className="size-7 rounded-full">
                      <AvatarImage src="https://images.shadcnspace.com/assets/profiles/user-11.jpg" />
                      <AvatarFallback>NJ</AvatarFallback>
                    </Avatar>
                  </div>
                }
              />
            </div>
          </div>
        </header>

        {/* <footer className="bg-card h-10 border-t">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="skeleton bg-muted/50 aspect-video h-14 w-full rounded-lg" />
          </div>
        </footer> */}
      </div>
    </div>
  );
};

export default AppHeader;
