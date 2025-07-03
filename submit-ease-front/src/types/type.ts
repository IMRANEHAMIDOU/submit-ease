export type UserType = {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  gender: number
  birth_date: string | null
  phone: string | null
  avatar: string | null
  role: string
  is_active?: boolean
  organization_id: number
  organization?: OrganizationType
}

export type CompagnFieldType = {
  id: number
  label: string
  description: string
  field_type: string
  options: string
  is_required: boolean
}

export type CompagnProfileType = {
  id: number
  name: string
  description: string
  positions_available: number
}

export type OrganizationType = {
  id: number
  name: string
  description: string
  logo: string
  domain: string
  contact_person: string
  email: string
  country: string
  city: string
  verified: boolean
  is_active: boolean
  address: string
  website: string
}

export type FormOrganization = {
  id?: number
  name: string
  description: string
  domain: string
  email: string
  contact_person: string
  country: string
  city: string
  address: string
  website: string
  verified: boolean
  is_active: boolean
}

export type FieldType = "file" | "text" | "textarea" | "radio" | "checkbox"

export type CampaignFieldType = {
  id?: number
  label: string
  description?: string
  field_type: FieldType
  options?: string | null
  order_number: number
  is_required: boolean
}

export type CampaignProfileType = {
  id?: number
  name: string
  description?: string
  positions_available: number
}

export type CampaignType = {
  id?: number
  title: string
  description?: string
  has_writen_test: boolean
  has_interview: boolean
  opening_date?: string
  closing_date?: string
  is_application_limited: boolean
  max_application: number
  publication_link?: string
  organization_id: number
  status?:string
  campaign_fields: CampaignFieldType[]
  campaign_profiles: CampaignProfileType[]
}
