import { execSync } from 'child_process'

const timezones = [
  'Africa/Algiers',
  'Asia/Kolkata',
  'America/Chicago',
  'Europe/Dublin',
]

timezones.forEach(zone => {
  console.log(`Testing for ${zone}`)
  execSync(`TZ=${zone} node -r tsm tests/UTCTimestampToDate.test.ts`, {
    stdio: 'inherit',
  })
})
