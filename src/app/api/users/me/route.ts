import { getDataFromToken } from '@/helpers/getDataFromToken';

import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select('-password');
    //Note: ` -password ` means except password everything so we use ` - minus ` so it can be .select('-password -isAdmin -etc..' );

    return NextResponse.json({
      message: 'User found',
      UserData: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
