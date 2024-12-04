// This is a server component
// e.g., in your page.js or a separate server component file
'use server'; // Mark this function as a server action

import { cookies } from 'next/headers'; // To access cookies on the server side
import { userService } from '@/services/userService'; // Adjust the import according to your file structure
import { revalidateTag } from 'next/cache';
export async function submit(data) {
  const cookieStore = cookies();
  const commonUserId = cookieStore.get('commonUserId')?.value; // Use optional chaining
  //const userName = cookieStore.get('username')?.value; // Use optional chaining
  try {
    await userService.updateUserDetails({
      requestBody: {
        user_id: commonUserId,
        first_name: data.firstName,
        last_name: data.lastName,
        mobile_no: data.mobile,
        country: data.country?.value,
        state: data.state?.value,
        city: data.city?.value,
        dob: `${data.year?.value}-${data.month?.value}-${data.day?.value}`,
        gender: data.gender,
      },
    });
    revalidateTag('yes');
  } catch (err) {
    console.log('Error:', err);
  }
}
