'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CommonHeader from '@/components/CommonHeader';
import Link from 'next/link';
import { locationService } from '@/services/locationService';
import { userService } from '@/services/userService';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import Select from 'react-select';
import { submit } from '@/actions/submit';
import { useRouter } from 'next/navigation';
import { notify } from '@/utils/Toast';
import useResource from '@/hooks/useResource';
import Image from 'next/image';
import Loader from '@/components/Loader';
import PostsLayout from '@/layouts/PostsLayout';
import { CiSettings } from 'react-icons/ci';

function EditProf() {
  const { data: session } = useSession();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();

  const {
    isLoading: isUpdating,
    error: updationError,
    fetchData: updateLoggedInUser,
  } = useResource(submit);
  const {
    isLoading: isUserDetailsLoading,
    error: loadUserDetailsError,
    fetchData: loadUserDetails,
  } = useResource(userService.getUserDetails);
  // const [, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset, // Add reset function
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '', // Initialize with static default values
      lastName: '',
      email: '',
      mobile: '',
      day: { value: '1', label: '1' },
      month: { value: '1', label: '1' },
      year: { value: '1990', label: '1990' },
      gender: '',
      country: {
        value: '',
        label: '',
      },
      state: { value: '', label: '' },
      city: { value: '', label: '' },
    },
  });

  useEffect(() => {
    (async () => {
      /*  const userdetails = await userService.getUserDetails({
        requestBody: { user_id: Cookies.get('commonUserId') },
      }); */

      const userdetails = await loadUserDetails({
        requestBody: { user_id: Cookies.get('commonUserId') },
      });
      // Reset the form with the fetched data
      const dob = userdetails?.dob?.split('-');
      const [year, month, date] = dob;
      reset({
        firstName: userdetails?.first_name || '',
        lastName: userdetails?.last_name || '',
        email: userdetails?.email || '',
        mobile: userdetails?.mobile_no || '',
        day: { value: date, label: date },
        month: { value: month, label: month },
        year: { value: year, label: year },
        gender: userdetails?.gender || '',
        country: {
          value: userdetails?.country_id,
          label: userdetails?.country,
        },
        state:
          { value: userdetails?.state_id, label: userdetails?.state } || '',
        city: { value: userdetails?.city_id, label: userdetails?.city } || '',
      });
    })();
  }, [reset]); // Add reset to the dependency array

  const selectedCountry = watch('country'); // Watching country dropdown
  const selectedState = watch('state'); // Watching state dropdown

  useEffect(() => {
    (async () => {
      const countriesResp = await locationService.getCountries();
      const mappedCountreis = countriesResp.map((country) => {
        return {
          value: country.id,
          label: country.name,
        };
      });
      setCountries(mappedCountreis);
    })();
  }, [selectedCountry?.value]);

  useEffect(() => {
    (async () => {
      if (!selectedCountry?.value) return;

      const statesResp = await locationService.getStates({
        requestBody: {
          country_id: String(selectedCountry?.value),
        },
      });
      const mappedStates = statesResp?.map((state) => {
        return {
          value: state.id,
          label: state.name,
        };
      });
      setStates(mappedStates);
    })();
  }, [selectedCountry?.value]);

  useEffect(() => {
    (async () => {
      if (!selectedState?.value) return;

      console.log('Selected-city', selectedState?.value);
      const citiesResp = await locationService.getCities({
        requestBody: {
          state_id: String(selectedState?.value),
        },
      });

      const mappedCities = citiesResp?.map((city) => {
        return {
          value: city.id,
          label: city.name,
        };
      });
      console.log(citiesResp);
      setCities(mappedCities);
    })();
  }, [selectedState?.value]);

  // Close dropdowns when clicking outside

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent', // Make the background transparent
      border: 'none', // Remove all borders
      borderBottom: '1px solid #808080',
      borderRadius: 0, // Remove the default border radius
      padding: '0.6em 0em',
      boxShadow: 'none',
      margin: '0',
      color: '#fff',
      '&:hover': {
        borderBottomColor: 'white', // Keep the white bottom border on hover
      },
    }),
    select: (provided) => ({
      ...provided,
      padding: '0', // Set padding for the input field to 0
      margin: '0',
      color: '#fff',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#000', // Dropdown arrow color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#f7f7f7', // Dropdown menu background color
      border: '1px solid #ccc',
      borderRadius: '5px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#333'
        : state.isFocused
        ? '#eee'
        : '#fff',
      color: state.isSelected ? '#fff' : '#333',
      padding: '10px',
      '&:hover': {
        backgroundColor: '#ddd',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff', // Set the text color in the input field while typing to white
    }),
  };

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`,
  }));
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`,
  })); // 1-12 for months
  const years = Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: `${year}`, label: `${year}` };
  });

  const onSubmit = async (data) => {
    await updateLoggedInUser(data);
    // await submit(data);
    const userName = Cookies.get('username');
    notify({ message: 'Profile updated successfully' });
    return router.push(`/profile/${userName}`);
  };

  if (isUpdating || isUserDetailsLoading) {
    return <Loader />;
  }
  return (
    <PostsLayout className={'mb-[70px]'}>
      <div className="relative">
        <CommonHeader shouldDisplay />
        <Link className="absolute block right-0 top-3" href={'/setting'}>
          <CiSettings className="text-[#fff]" size={28} />
        </Link>
      </div>

      <div
        className="mx-auto h-[220px] bg-cover bg-center rounded-lg relative p-4 text-white"
        style={{ backgroundImage: "url('https://picsum.photos/200/300')" }}
      >
        <h1 className="text-center mb-4">My Profile</h1>

        <div className="w-[100px] h-[100px] rounded-full border border-white overflow-hidden relative mx-auto">
          <input
            type="file"
            accept="image/*"
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
          <Image
            src={session?.user?.image}
            alt="Profile"
            className="object-cover"
            width={100}
            height={100}
          />
          <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <span className="text-white text-[18px]">cam</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-4 text-white">
        {/* First Name */}
        <div className="mb-4">
          <label className="block">First Name</label>
          <input
            {...register('firstName', { required: true, minLength: 4 })}
            type="text"
            placeholder="Enter first name"
            className="w-full border-b border-gray-500 bg-transparent text-white text-base py-2 focus:outline-none"
          />
          {errors.firstName && (
            <span className="text-red-500">First name is required</span>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block">Last Name</label>
          <input
            {...register('lastName', { required: true })}
            type="text"
            placeholder="Enter last name"
            className="w-full border-b border-gray-500 bg-transparent text-white text-base py-2 focus:outline-none"
          />
          {errors.lastName && (
            <span className="text-red-500">Last name is required</span>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="Enter email"
            className="w-full border-b border-gray-500 bg-transparent text-white text-base py-2 focus:outline-none"
            disabled
          />
          {/* {errors.email && (
      <span className="text-red-500">Valid email is required</span>
    )} */}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label className="block">Mobile Number</label>
          <input
            {...register('mobile', { required: true, pattern: /^[0-9]{10}$/ })}
            type="tel"
            placeholder="Enter mobile number"
            className="w-full border-b border-gray-500 bg-transparent text-white text-base py-2 focus:outline-none"
          />
          {errors.mobile && (
            <span className="text-red-500">
              Valid 10-digit mobile number is required
            </span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex justify-between mb-4">
          <div>
            <label>Day</label>
            <Controller
              name="day"
              control={control}
              render={({ field }) => (
                <Select {...field} styles={customStyles} options={days} />
              )}
            />
          </div>

          {/* Dropdown for Month */}
          <div>
            <label>Month</label>
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <Select {...field} styles={customStyles} options={months} />
              )}
            />
          </div>

          {/* Dropdown for Year */}
          <div>
            <label>Year</label>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Select {...field} styles={customStyles} options={years} />
              )}
            />
          </div>
        </div>

        {/* Gender (Radio Buttons) */}
        <div className="mb-8 flex gap-4 items-center">
          <h4>Gender</h4>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="male"
                    checked={field.value === 1}
                    onChange={() => field.onChange(1)}
                  />
                )}
              />
              <label>Male</label>
            </div>
            <div className="flex gap-2 items-center">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="female"
                    checked={field.value === 2}
                    onChange={() => field.onChange(2)}
                  />
                )}
              />
              <label>Female</label>
            </div>
            <div className="flex gap-2 items-center">
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="not-specified"
                    checked={field.value === 3}
                    onChange={() => field.onChange(3)}
                  />
                )}
              />
              <label>Not Specify</label>
            </div>
          </div>
          {errors.gender && (
            <span className="text-red-500">Gender is required</span>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label>Country</label>
          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{ required: 'Country is required' }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  onChange={(option) => {
                    field.onChange(option);
                    setValue('state', '');
                    setValue('city', '');
                  }}
                  styles={customStyles}
                  options={countries}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-xs">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label>State</label>
          <Controller
            name="state"
            control={control}
            defaultValue=""
            rules={{ required: 'State is required' }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  onChange={(option) => {
                    field.onChange(option);
                    setValue('city', '');
                  }}
                  styles={customStyles}
                  options={states}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-xs">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label>City</label>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: 'City is required' }}
            render={({ field, fieldState }) => (
              <>
                <Select {...field} styles={customStyles} options={cities} />
                {fieldState.error && (
                  <span className="text-red-500 text-xs">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        {/* Update and Cancel Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            type="submit"
            className="px-8 py-2 bg-[#8500ff] text-white rounded-[10px] cursor-pointer"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-2 bg-[#8500ff] text-white rounded-[10px] cursor-pointer "
          >
            Cancel
          </button>
        </div>
      </form>
    </PostsLayout>
  );
}

export default EditProf;
