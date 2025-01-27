import React from "react"
import Image from "next/image"
import { useResponsiveVariants } from "@/hooks/use-responsive-variants"
import { useIsMobile } from "@/hooks/use-screen-sizes"
import { signOut, useSession } from "next-auth/react"
import { AvatarVariantProps } from "@mijn-ui/react-theme"
import { Avatar, AvatarFallback, AvatarImage, AvatarProps } from "@mijn-ui/react-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@mijn-ui/react-dropdown-menu"
import { CURRENT_USER_TYPE, LANGUAGE_OPTIONS_TYPE } from "../_data/navbar-data"

/* -------------------------------------------------------------------------- */

type ProfileProps = {
  LanguageOptions: LANGUAGE_OPTIONS_TYPE[]
  user: CURRENT_USER_TYPE
  selectedLanguage: string
  onSelect: (value: string) => void
}

const Profile = ({ user, LanguageOptions, selectedLanguage, onSelect }: ProfileProps) => {
  const { data: session } = useSession()
  const isMobile = useIsMobile()

  const renderUserAvatar = (
    <ResponsiveAvatar className="rounded-full">
      <AvatarImage src={session?.user?.image ?? ""} alt={user.name} />
      <AvatarFallback className="size-full cursor-pointer">{session?.user?.name?.[0]}</AvatarFallback>
    </ResponsiveAvatar>
  )

  const renderUserInfo = (
    <div className="flex items-center gap-4">
      {renderUserAvatar}
      <div>
        <p className="font-semibold text-foreground md:text-sm">{session?.user?.name}</p>
        <p className="text-xs text-muted-foreground">Operator</p>
      </div>
    </div>
  )

  const selectedLanguageData = LanguageOptions.find((option) => option.name === selectedLanguage) || LanguageOptions[0]

  const renderLanguageSelector = (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <div className="flex items-center gap-2 text-xs/6">
          <Image
            src={selectedLanguageData.src}
            width={80}
            height={80}
            alt={selectedLanguageData.alt}
            className="size-4 rounded-md"
          />

          {selectedLanguageData.name}
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          {LanguageOptions.map((option) => (
            <DropdownMenuItem key={option.name} onClick={() => onSelect(option.name)}>
              <div className="flex items-center gap-2 text-xs/6">
                <Image src={option.src} width={80} height={80} alt={option.alt} className="size-4 rounded-md" />

                {option.name}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger unstyled asChild>
        {renderUserAvatar}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 gap-0 md:w-64" align="end">
        <DropdownMenuGroup className="p-2">{renderUserInfo}</DropdownMenuGroup>
        <DropdownMenuGroup className="space-y-2 px-2">
          <DropdownMenuItem>My Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>

          {isMobile && (
            <>
              <DropdownMenuSeparator />
              {renderLanguageSelector}
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="p-2">
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ResponsiveAvatar = (props: AvatarProps) => {
  const { size } = useResponsiveVariants<AvatarVariantProps>({
    size: {
      initial: "sm",
      sm: "md",
    },
  })

  return <Avatar size={size} {...props} />
}

export default Profile
