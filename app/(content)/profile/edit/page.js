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

function EditProf() {
  const { data: session } = useSession();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();

  const { isLoading, error, fetchData } = useResource(submit);

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
      const userdetails = await userService.getUserDetails({
        requestBody: { user_id: Cookies.get('commonUserId') },
      });
      console.log('userdetailsm', userdetails);
      // Reset the form with the fetched data
      const dob = userdetails?.dob?.split('-');
      const [year, month, date] = dob;
      console.log('year', 'month', 'date', year, month, date);
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
  console.log('selectedState', selectedState, selectedCountry);

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
      const statesResp = await locationService.getStates({
        requestBody: {
          country_id: String(selectedCountry?.value),
        },
      });
      console.log('state', statesResp);
      const mappedStates = statesResp?.map((state) => {
        return {
          value: state.id,
          label: state.name,
        };
      });
      console.log('statesResp', mappedStates);
      setStates(mappedStates);
    })();
  }, [selectedCountry?.value]);

  useEffect(() => {
    (async () => {
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
      borderBottom: '2px solid white', // Only bottom border is visible
      borderRadius: 0, // Remove the default border radius
      padding: '5px',
      boxShadow: 'none',
      '&:hover': {
        borderBottomColor: 'white', // Keep the white bottom border on hover
      },
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
    const year = 2023 - i;
    return { value: `${year}`, label: `${year}` };
  });

  const onSubmit = async (data) => {
    await fetchData(data);
    // await submit(data);
    const userName = Cookies.get('username');
    notify({ message: 'Profile updated successfully' });
    return router.push(`/profile/${userName}`);
  };

  if (isLoading) {
    return (
      <p
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        your profile is being updated
      </p>
    );
  }
  return (
    <div style={{ width: '100%', marginBottom: '4em' }}>
      <div
        style={{ position: 'relative', margin: '1em auto', maxWidth: '440px' }}
      >
        <CommonHeader />
        <Link
          style={{
            position: 'absolute',
            display: 'block',
            right: '0px',
            top: '0px',
          }}
          href={'/setting'}
        >
          <Image
            src="https://demo3.greynium.com/hitzfeed/images/icons/settings.svg"
            width={30}
            height={30}
            alt="alternate"
          />
        </Link>
      </div>
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          height: '220px',
          background: "url('https://picsum.photos/200/300') center no-repeat",
          backgroundSize: 'cover',
          borderRadius: '8px',
          position: 'relative',
          padding: '1em',
          color: 'white',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1em' }}>My Profile</h1>

        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '1px solid white',
            overflow: 'hidden',
            position: 'relative',
            margin: '0 auto',
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
          <Image
            src={session?.user?.image}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '30px',
              height: '30px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: '18px' }}>cam</span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '440px', margin: '0 auto', color: 'white' }}
      >
        {/* First Name */}
        <div style={{ marginBottom: '1em' }}>
          <label style={{ display: 'block', marginBottom: '0.5em' }}>
            First Name
          </label>
          <input
            {...register('firstName', { required: true, minLength: 4 })}
            type="text"
            placeholder="Enter first name"
            style={{
              width: '100%',
              padding: '0.5em',
              border: 'none',
              borderBottom: '2px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              outline: 'none',
            }}
          />
          {errors.firstName && (
            <span style={{ color: 'red' }}>First name is required</span>
          )}
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: '1em' }}>
          <label style={{ display: 'block', marginBottom: '0.5em' }}>
            Last Name
          </label>
          <input
            {...register('lastName', { required: true })}
            type="text"
            placeholder="Enter last name"
            style={{
              width: '100%',
              padding: '0.5em',
              border: 'none',
              borderBottom: '2px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              outline: 'none',
            }}
          />
          {errors.lastName && (
            <span style={{ color: 'red' }}>Last name is required</span>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1em' }}>
          <label style={{ display: 'block', marginBottom: '0.5em' }}>
            Email
          </label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            placeholder="Enter email"
            style={{
              width: '100%',
              padding: '0.5em',
              border: 'none',
              borderBottom: '2px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              outline: 'none',
            }}
            disabled
          />
          {errors.email && (
            <span style={{ color: 'red' }}>Valid email is required</span>
          )}
        </div>

        {/* Mobile Number */}
        <div style={{ marginBottom: '1em' }}>
          <label style={{ display: 'block', marginBottom: '0.5em' }}>
            Mobile Number
          </label>
          <input
            {...register('mobile', { required: true, pattern: /^[0-9]{10}$/ })}
            type="tel"
            placeholder="Enter mobile number"
            style={{
              width: '100%',
              padding: '0.5em',
              border: 'none',
              borderBottom: '2px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              outline: 'none',
            }}
          />
          {errors.mobile && (
            <span style={{ color: 'red' }}>
              Valid 10-digit mobile number is required
            </span>
          )}
        </div>
        {/* Date of Birth */}
        <div
          style={{
            display: 'flex',
            gap: '4em',
            justifyContent: 'space-between',
            marginBottom: '2em',
          }}
        >
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
                <Select
                  {...field}
                  styles={customStyles}
                  options={months} // Showing numeric months (1-12)
                />
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
                <Select {...field} options={years} styles={customStyles} />
              )}
            />
          </div>
        </div>

        {/* Gender (Radio Buttons) */}
        <div style={{ marginBottom: '2em', display: 'flex', gap: '1em' }}>
          <h4>Gender</h4>
          <div style={{ display: 'flex', gap: '1em' }}>
            <div style={{ display: 'flex', gap: '1em' }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="male"
                    checked={field.value === 1} // Checked by default
                    onChange={() => {
                      field.onChange(1); // Update form state
                      //handleGenderChange('male'); // Call your change handler
                    }}
                  />
                )}
              />
              <label>Male</label>
            </div>
            <div style={{ display: 'flex', gap: '1em' }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="female"
                    checked={field.value === 2}
                    onChange={() => {
                      field.onChange(2); // Update form state
                      //handleGenderChange('male'); // Call your change handler
                    }}
                  />
                )}
              />
              <label>Female</label>
            </div>
            <div style={{ display: 'flex', gap: '1em' }}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    value="not-specified"
                    checked={field.value === 3}
                    onChange={() => {
                      field.onChange(3); // Update form state
                      // handleGenderChange('male'); // Call your change handler
                    }}
                  />
                )}
              />
              <label>Not Specify</label>
            </div>
          </div>
          {errors.gender && (
            <span style={{ color: 'red' }}>Gender is required</span>
          )}
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label>Country</label>
          <Controller
            name="country"
            control={control}
            defaultValue="" // Default value for the field
            rules={{ required: 'Country is required' }} // Validation rules
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  onChange={(option) => {
                    field.onChange(option); // Update form state
                    setValue('state', ''); // Reset state when country changes
                    setValue('city', ''); // Reset city when country changes
                  }}
                  styles={customStyles}
                  options={countries}
                />
                {fieldState.error && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label>State</label>
          <Controller
            name="state"
            control={control}
            defaultValue="" // Default value for the field
            rules={{ required: 'State is required' }} // Validation rules
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  onChange={(option) => {
                    field.onChange(option); // Update form state
                    setValue('city', ''); // Reset city when state changes
                  }}
                  styles={customStyles}
                  options={states}
                />
                {fieldState.error && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        {/* City */}
        <div style={{ marginBottom: '1em' }}>
          <label>City</label>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: 'City is required' }} // Validation rules
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  styles={customStyles}
                  options={cities} // Make sure cities is defined
                />
                {fieldState.error && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        {/* Update and Cancel Buttons */}
        <div
          style={{
            marginTop: '1.5em',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="submit"
            style={{
              padding: '0.7em 2em',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => console.log('Cancelled')}
            style={{
              padding: '0.7em 2em',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProf;
