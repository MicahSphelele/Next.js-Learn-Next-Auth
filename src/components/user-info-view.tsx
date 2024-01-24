"use client";

const UserInfoView = () => {
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
                <div>
                    Name: <span className="font-bold">Sphelele Ngubane</span>
                </div>
                <div>
                    E-mail: <span className="font-bold">sphemicah@gmail.com</span>
                </div>
                <button className="bg-red-500 text-white font-bold py-2 px-6 mt-3">Sign out</button>
            </div>
        </div>
    )
};

export default UserInfoView;
