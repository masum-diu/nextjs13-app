/** Category → subcategory tree for shop-style filtering */
export const CATEGORY_TREE = [
  {
    id: 'premium',
    label: 'Premium Breeds',
    description: 'Emo, OT & rare farm selections',
    subs: [
      { id: 'emo-line', label: 'Emo Line' },
      { id: 'ot-line', label: 'OT Line' },
      { id: 'rare', label: 'Rare & Special' },
    ],
  },
  {
    id: 'local',
    label: 'Local & Popular',
    description: 'Trusted local breeds',
    subs: [
      { id: 'deshi', label: 'Deshi' },
      { id: 'mixed', label: 'Mixed Local' },
    ],
  },
  {
    id: 'farm',
    label: 'Farm & Care',
    description: 'Support products from SN Agro',
    subs: [
      { id: 'nutrition', label: 'Nutrition' },
      { id: 'wellness', label: 'Wellness' },
    ],
  },
]

export function matchesCatalogFilter(bird, categoryId, subcategoryId) {
  if (!categoryId) return true
  if (bird.categoryId !== categoryId) return false
  if (!subcategoryId) return true
  return bird.subcategoryId === subcategoryId
}
