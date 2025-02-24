import { useGlobalContext } from "@/lib/global-provider";
import { Link } from "expo-router";
import {
  Image,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";

export default function Index() {
  const { user } = useGlobalContext();
  return (
    <>
      <SafeAreaView className="h-full bg-white px-3">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row">
            <Image
              source={{ uri: user?.avatar }}
              className="size-12 rounded-full"
            />

            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-base font-rubik-medium text-black-300">
                {user?.name}
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="text-xl font-rubik-bold text-black-300">
            Featured
          </Text>
          <TouchableOpacity>
            <Text className="text-base font-rubik-bold text-primary-300">
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <Search />
      </SafeAreaView>
    </>
  );
}
