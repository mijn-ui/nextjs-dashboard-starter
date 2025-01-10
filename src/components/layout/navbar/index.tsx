"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useResponsiveVariants } from "@/hooks/use-responsive-variants"
import { useScreenSizes } from "@/hooks/use-screen-sizes"
import { FaCashRegister, FaVolumeLow } from "react-icons/fa6"
import { LuMenu } from "react-icons/lu"
import { ButtonVariantProps } from "@mijn-ui/react-theme"
import { Button, ButtonProps } from "@mijn-ui/react-button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mijn-ui/react-select"
import Logo from "@/components/common/logo"
import ThemeToggle from "@/components/theme/theme-toggle"
import { LANGUAGE_OPTIONS_TYPE } from "../_data/navbar-data"
import {
  CURRENT_USER,
  DEFAULT_SELECTED_LANGUAGE,
  LANGUAGE_OPTIONS,
} from "../_data/navbar-data"
import Profile from "./navbar-profile"
import PageInfo from "./page-info"

/* -------------------------------------------------------------------------- */

type NavbarProps = {
  style?: React.CSSProperties
  setIsSidebarActive: (isOpen: boolean) => void
}

const Navbar = ({ style, setIsSidebarActive }: NavbarProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    DEFAULT_SELECTED_LANGUAGE,
  )

  const { isMobile, isDesktop } = useScreenSizes()

  const renderSidebarToggleMenu = (
    <div className="flex items-center gap-1">
      <IconButton onClick={() => setIsSidebarActive(true)} variant="ghost">
        <LuMenu />
      </IconButton>
      <div className="mt-1 flex items-center gap-1">
        <Logo className="flex size-4 items-center justify-center p-0" />
        <p className="text-small font-bold">MijnUI</p>
      </div>
    </div>
  )

  return (
    <header
      className="preview fixed inset-x-0 top-0 z-30 flex h-[var(--navbar-height)] w-full items-center justify-between backdrop-blur"
      style={style}
    >
      <nav className="flex w-full items-center justify-between px-2 md:px-5">
        {isDesktop ? <PageInfo /> : renderSidebarToggleMenu}
        <div className="flex w-fit items-stretch gap-2">
          {!isMobile && (
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onValueChange={setSelectedLanguage}
              LanguageOptions={LANGUAGE_OPTIONS}
            />
          )}

          <IconButton>
            <FaCashRegister className="size-3.5" />
          </IconButton>
          <IconButton>
            <FaVolumeLow className="size-3.5" />
          </IconButton>
          <IconButton asChild>
            <ThemeToggle unstyled />
          </IconButton>
          <Profile
            user={CURRENT_USER}
            selectedLanguage={selectedLanguage}
            onSelect={setSelectedLanguage}
            LanguageOptions={LANGUAGE_OPTIONS}
          />
        </div>
      </nav>
    </header>
  )
}
/* -------------------------------------------------------------------------- */

type LanguageSelectorProps = {
  LanguageOptions: LANGUAGE_OPTIONS_TYPE[]
  selectedLanguage: string
  onValueChange: (value: string) => void
}

const LanguageSelector = ({
  LanguageOptions,
  selectedLanguage,
  onValueChange,
}: LanguageSelectorProps) => {
  return (
    <Select
      defaultValue={selectedLanguage}
      value={selectedLanguage}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent side="bottom" align="end" className="w-40">
        {LanguageOptions.map((option) => (
          <SelectItem key={option.name} value={option.name}>
            <div className="flex items-center gap-2 text-xs/6">
              <Image
                src={option.src}
                width={80}
                height={80}
                alt={option.alt}
                className="size-4 rounded-md"
              />
              {option.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/* -------------------------------------------------------------------------- */

const IconButton = ({ children, ...props }: ButtonProps) => {
  const { size } = useResponsiveVariants<ButtonVariantProps>({
    size: {
      initial: "xs",
      sm: "md",
    },
  })

  return (
    <Button size={size} iconOnly {...props}>
      {children}
    </Button>
  )
}

export default Navbar
