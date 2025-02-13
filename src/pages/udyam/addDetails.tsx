import ScreenLayout from "@/components/layouts/screenLayout";
import {
  Button,
  Text,
  TextInput,
  NumberInput,
  Select,
  Checkbox,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  ActivityCategory,
  Gender,
  SocialCategory,
  TypeOfOrganisation,
} from "@/constants/addDetails";

const AddDetailPage = () => {
  const form = useForm({
    initialValues: {
      pan: "",
      nameOnPan: "",
      typeOfOrganisation: "",
      dob: "",
      email: "",
      mobile: "",
      socialCategory: "",
      gender: "",
      speciallyAbled: false,
      enterpriseName: "",
      units: [],
      officialAddress: {
        door: "",
        premises: "",
        town: "",
        block: "",
        road: "",
        city: "",
        district: "KOLHAPUR",
        state: "MAHARASHTRA",
        pincode: "416003",
      },
      enterpriseStatus: {
        dateOfIncorporation: "",
        dateOfCommencement: null,
      },
      bankDetails: {
        accountNumber: null,
        ifscCode: null,
      },
      activityCategory: "",
      tradingServices: false,
      nic_codes: ["10409"],
      numberOfEmployees: {
        male: null,
        female: null,
        others: null,
      },
    },
    validate: {},
    validateInputOnBlur: true,
  });

  const handleDetailAddition = form.onSubmit((values) => {});

  return (
    <ScreenLayout title="Udyam Registration - Add Details">
      <div className="w-full flex flex-col justify-around pt-8">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-full">
            <form onSubmit={handleDetailAddition}>
              <div className="flex justify-stretch">
                <div className="w-full mr-8">
                  <Text mb={16}>Enterprise Details</Text>
                  {/* PAN Details */}
                  <div className="flex justify-stretch">
                    <TextInput
                      required
                      className="w-full"
                      label="PAN Number"
                      placeholder="PAN Number"
                      {...form.getInputProps("pan")}
                      mb={16}
                      mr={16}
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Name on PAN"
                      placeholder="Name on PAN"
                      {...form.getInputProps("nameOnPan")}
                      mb={16}
                      mr={16}
                    />

                    <Select
                      required
                      className="w-full"
                      label="Type of organisation"
                      placeholder="Type of organisation"
                      {...form.getInputProps("typeOfOrganisation")}
                      mb={16}
                      data={Object.values(TypeOfOrganisation)}
                    />
                  </div>

                  {/* Personal Details */}
                  <div className="flex justify-stretch">
                    <DateInput
                      required
                      className="w-full"
                      label="Date of birth"
                      placeholder="Date of birth"
                      {...form.getInputProps("dob")}
                      mb={16}
                      mr={16}
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Email"
                      placeholder="Email"
                      {...form.getInputProps("email")}
                      mb={16}
                      mr={16}
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Mobile"
                      placeholder="Mobile"
                      {...form.getInputProps("mobile")}
                      mb={16}
                    />
                  </div>

                  <div className="flex justify-stretch items-center">
                    <Select
                      required
                      className="w-full"
                      label="Social Category"
                      placeholder="Social Category"
                      {...form.getInputProps("socialCategory")}
                      mb={16}
                      mr={16}
                      data={Object.values(SocialCategory)}
                    />

                    <Select
                      required
                      className="w-full"
                      label="Gender"
                      placeholder="Gender"
                      {...form.getInputProps("gender")}
                      mb={16}
                      mr={16}
                      data={Object.values(Gender)}
                    />

                    <Checkbox
                      required
                      className="w-full"
                      label="Specially Abled"
                      {...form.getInputProps("speciallyAbled", {
                        type: "checkbox",
                      })}
                      mb={16}
                    />
                  </div>

                  <div className="flex justify-stretch items-center">
                    <TextInput
                      required
                      className="w-full"
                      label="Enterprise Name"
                      placeholder="Enterprise Name"
                      {...form.getInputProps("enterpriseName")}
                      mb={16}
                      mr={16}
                    />

                    <Select
                      required
                      className="w-full"
                      label="Activity Category"
                      placeholder="Activity Category"
                      {...form.getInputProps("activityCategory")}
                      mb={16}
                      mr={16}
                      data={Object.values(ActivityCategory)}
                    />

                    <Checkbox
                      required
                      className="w-full"
                      label="Trading Services"
                      {...form.getInputProps("tradingServices", {
                        type: "checkbox",
                      })}
                      mb={16}
                    />
                  </div>

                  <div className="flex justify-stretch items-center">
                    <DateInput
                      required
                      className="w-full"
                      label="Date Of Incorporation"
                      placeholder="Date Of Incorporation"
                      key={form.key("enterpriseStatus.dateOfIncorporation")}
                      {...form.getInputProps(
                        "enterpriseStatus.dateOfIncorporation"
                      )}
                      mb={16}
                      mr={16}
                    />

                    <DateInput
                      className="w-full"
                      label="Date Of Commencement"
                      placeholder="Date Of Commencement"
                      key={form.key("enterpriseStatus.dateOfCommencement")}
                      {...form.getInputProps(
                        "enterpriseStatus.dateOfCommencement"
                      )}
                      mb={16}
                      mr={16}
                    />
                  </div>

                  <div className="flex justify-stretch items-center">
                    <TextInput
                      required
                      className="w-full"
                      label="Account Number"
                      placeholder="Account Number"
                      key={form.key("bankDetails.accountNumber")}
                      {...form.getInputProps("bankDetails.accountNumber")}
                      mb={16}
                      mr={16}
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="IFSC"
                      placeholder="IFSC"
                      key={form.key("bankDetails.ifscCode")}
                      {...form.getInputProps("bankDetails.ifscCode")}
                      mb={16}
                      mr={16}
                    />
                  </div>

                  <div className="flex justify-stretch items-center">
                    <NumberInput
                      required
                      className="w-full"
                      label="Employee count (male)"
                      placeholder="Employee count (Male)"
                      key={form.key("numberOfEmployees.male")}
                      {...form.getInputProps("numberOfEmployees.male")}
                      mb={16}
                      mr={16}
                    />

                    <NumberInput
                      required
                      className="w-full"
                      label="Employee count (female)"
                      placeholder="Employee count (female)"
                      key={form.key("numberOfEmployees.female")}
                      {...form.getInputProps("numberOfEmployees.female")}
                      mb={16}
                      mr={16}
                    />

                    <NumberInput
                      required
                      className="w-full"
                      label="Employee count (others)"
                      placeholder="Employee count (others)"
                      key={form.key("numberOfEmployees.others")}
                      {...form.getInputProps("numberOfEmployees.others")}
                      mb={16}
                      mr={16}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <Text mb={16}>Official Address</Text>

                  <div className="flex justify-stretch">
                    <TextInput
                      required
                      className="w-full"
                      label="Door"
                      placeholder="Door"
                      key={form.key("officialAddress.door")}
                      {...form.getInputProps("officialAddress.door")}
                      mb={16}
                      mr={16}
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Premises"
                      placeholder="Premises"
                      key={form.key("officialAddress.premises")}
                      {...form.getInputProps("officialAddress.premises")}
                      mb={16}
                      mr={16}
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Town"
                      placeholder="Town"
                      key={form.key("officialAddress.town")}
                      {...form.getInputProps("officialAddress.town")}
                      mb={16}
                    />
                  </div>

                  <div className="flex justify-stretch">
                    <TextInput
                      required
                      className="w-full"
                      label="Block"
                      placeholder="Block"
                      key={form.key("officialAddress.block")}
                      {...form.getInputProps("officialAddress.block")}
                      mb={16}
                      mr={16}
                    />
                    <TextInput
                      required
                      className="w-full"
                      label="Road"
                      placeholder="Road"
                      key={form.key("officialAddress.road")}
                      {...form.getInputProps("officialAddress.road")}
                      mb={16}
                      mr={16}
                    />
                    <TextInput
                      required
                      className="w-full"
                      label="City"
                      placeholder="City"
                      key={form.key("officialAddress.city")}
                      {...form.getInputProps("officialAddress.city")}
                      mb={16}
                    />
                  </div>

                  <div className="flex justify-stretch">
                    <Select
                      required
                      className="w-full"
                      label="District"
                      placeholder="District"
                      key={form.key("officialAddress.district")}
                      {...form.getInputProps("officialAddress.district")}
                      mb={16}
                      mr={16}
                      data={["KOLHAPUR"]}
                      disabled
                    />

                    <Select
                      required
                      className="w-full"
                      label="State"
                      placeholder="State"
                      key={form.key("officialAddress.state")}
                      mb={16}
                      mr={16}
                      data={["MAHARASHTRA"]}
                      {...form.getInputProps("officialAddress.state")}
                      disabled
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Pincode"
                      placeholder="Pincode"
                      key={form.key("officialAddress.pincode")}
                      {...form.getInputProps("officialAddress.pincode")}
                      mb={16}
                      disabled
                    />
                  </div>

                  <Text mb={16}>Unit Address</Text>
                  <div className="flex justify-stretch">
                    <TextInput
                      required
                      className="w-full"
                      label="Door"
                      placeholder="Door"
                      key={form.key("officialAddress.door")}
                      {...form.getInputProps("officialAddress.door")}
                      mb={16}
                      mr={16}
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Premises"
                      placeholder="Premises"
                      key={form.key("officialAddress.premises")}
                      {...form.getInputProps("officialAddress.premises")}
                      mb={16}
                      mr={16}
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Town"
                      placeholder="Town"
                      key={form.key("officialAddress.town")}
                      {...form.getInputProps("officialAddress.town")}
                      mb={16}
                    />
                  </div>

                  <div className="flex justify-stretch">
                    <TextInput
                      required
                      className="w-full"
                      label="Block"
                      placeholder="Block"
                      key={form.key("officialAddress.block")}
                      {...form.getInputProps("officialAddress.block")}
                      mb={16}
                      mr={16}
                    />
                    <TextInput
                      required
                      className="w-full"
                      label="Road"
                      placeholder="Road"
                      key={form.key("officialAddress.road")}
                      {...form.getInputProps("officialAddress.road")}
                      mb={16}
                      mr={16}
                    />
                    <TextInput
                      required
                      className="w-full"
                      label="City"
                      placeholder="City"
                      key={form.key("officialAddress.city")}
                      {...form.getInputProps("officialAddress.city")}
                      mb={16}
                    />
                  </div>

                  <div className="flex justify-stretch">
                    <Select
                      required
                      className="w-full"
                      label="District"
                      placeholder="District"
                      key={form.key("officialAddress.district")}
                      {...form.getInputProps("officialAddress.district")}
                      mb={16}
                      mr={16}
                      data={["KOLHAPUR"]}
                      disabled
                    />

                    <Select
                      required
                      className="w-full"
                      label="State"
                      placeholder="State"
                      key={form.key("officialAddress.state")}
                      mb={16}
                      mr={16}
                      data={["MAHARASHTRA"]}
                      {...form.getInputProps("officialAddress.state")}
                      disabled
                    />

                    <TextInput
                      required
                      className="w-full"
                      label="Pincode"
                      placeholder="Pincode"
                      key={form.key("officialAddress.pincode")}
                      {...form.getInputProps("officialAddress.pincode")}
                      mb={16}
                      disabled
                    />
                  </div>

                </div>

              </div>

              <Button type="submit" fullWidth>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ScreenLayout>
  );
};

export default AddDetailPage;
