package util;

import android.content.Context;
import android.database.ContentObserver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.provider.Telephony;
import android.util.Log;

import com.lib.common.PPBuildConfig;

/**
 * Created by Administrator on 2015/8/6 0006.
 */
public class SmsContentObserver extends ContentObserver {

    private static String TAG = "myTag";


    private Context mContext;

    private static String ORDER = null;// as same as default
    public static String[] PROJECTIONS = null;
    public static String SELECTION_ADDRESS_DOUBLE = null;
    public static String[] SELECTION_ADDRESS_DOUBLE_ARGS = new String[]{"%11", "%00"};
    public static Uri URI_SMS_INBOX = null;

    private Uri mUri;
    private String mSelection = null;
    private String[] mProjection = null;
    private String[] mSelectionArgs = null;
    private String mOrder;

    static {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            URI_SMS_INBOX = Telephony.Sms.Inbox.CONTENT_URI;
            PROJECTIONS = new String[]{Telephony.Sms.Inbox._ID, Telephony.Sms.Inbox.ADDRESS, Telephony.Sms.Inbox.BODY, Telephony.Sms.Inbox.DATE};
            ORDER = Telephony.Sms.Inbox.DEFAULT_SORT_ORDER + " limit 10";
            SELECTION_ADDRESS_DOUBLE = Telephony.Sms.Inbox.ADDRESS + " like ? or " + Telephony.Sms.Inbox.ADDRESS + " like ?";
        } else {
            URI_SMS_INBOX = Uri.parse("content://sms/inbox");
            PROJECTIONS = new String[]{"_id", "address", "body", "date"};
            ORDER = "date DESC limit 10";
            SELECTION_ADDRESS_DOUBLE = "address like ? or  address like ?";
        }

    }

    public PPSmsContentObserver(Handler handler) {
        super(handler);
    }

    @Override
    public void onChange(boolean selfChange) {
        super.onChange(selfChange);
        Log.e("myTag", "onChange:" + selfChange);
    }


    private void queryOne() {
        if (PPBuildConfig.DEBUG) {
            Log.d(TAG, "begin query  uri:" + mUri + " selections:" + mSelection + ", args:" + mSelectionArgs);
        }
        Cursor cursor = mContext.getContentResolver().query(mUri, mProjection, mSelection, mSelectionArgs, mOrder);
        try {
            if (cursor != null && cursor.getCount() > 0) {
                cursor.moveToFirst();
                do {
                    long data = cursor.getLong(3);
                    String content = cursor.getString(2);
                    String from = cursor.getString(1);
                    if (PPBuildConfig.DEBUG) {
                        Log.d(TAG, String.format("time:%d,from:%s,content:%s", data, from, content));
                    }

                } while (cursor.moveToNext());


            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (cursor != null) {
                try {
                    cursor.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
                cursor = null;
            }
        }
    }

    @Override
    public void onChange(boolean selfChange, Uri uri) {
        super.onChange(selfChange, uri);
        Log.e("myTag", "onChange:" + selfChange + " uri:" + uri);
        queryOne();

    }

    public void releaseResource(Context c) {
        c.getContentResolver().unregisterContentObserver(this);
    }


    /**
     * @param context
     * @param minTime the min time to get the code , 0 means now
     * @return
     */
    public static PPSmsContentObserver getSmsContentObserver(Context context) {
        return getSmsContentObserver(context, URI_SMS_INBOX, PROJECTIONS, SELECTION_ADDRESS_DOUBLE, SELECTION_ADDRESS_DOUBLE_ARGS, ORDER);

    }

    public static PPSmsContentObserver getSmsContentObserver(Context context, Uri uri, String[] projection, String selection,
                                                             String[] selectArgs, String order) {
        PPSmsContentObserver oberserver = new PPSmsContentObserver(new Handler(Looper.getMainLooper()));

        oberserver.mContext = context;
        oberserver.mUri = uri;
        oberserver.mProjection = projection;
        oberserver.mSelection = selection;
        oberserver.mSelectionArgs = selectArgs;
        oberserver.mOrder = order;

        context.getContentResolver().registerContentObserver(oberserver.mUri, true, oberserver);


        oberserver.queryOne();

        return oberserver;
    }


}
